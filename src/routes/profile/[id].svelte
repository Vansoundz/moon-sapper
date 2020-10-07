<script lang="ts" context="module">
  import { getUserById } from "../../api/auth.api";
  export async function preload(page, _) {
    const { id } = page.params;

    try {
      let resp = await getUserById(id);

      if (resp.user) return { ...resp, id };
      return { user: null, id };
    } catch (error) {
      console.log(error);
      return { user: null, id };
    }
  }
</script>

<script lang="ts">
  import Property from "../../components/Property.svelte";
  import type User from "../../models/UserModel";
  import { auth } from "../../store/auth";
  export let user: User = {};
  export let id: string = "";
  import { goto } from "@sapper/app";
  // import { onMount } from "svelte";

  const refetch = async () => {
    let resp = await getUserById(id);

    if (resp.user) user = resp.user;
  };

  $: {
    if (!user) {
      goto("listings");
    }
  }
</script>

<style>
  .profile-head {
    position: relative;
    margin: auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .user-listings {
    /* margin: 24px 16px; */
    width: 90%;
    margin: 24px auto;
  }

  .profile {
    margin-top: 16px;
  }

  .image {
    width: 300px;
    height: 300px;
    max-width: 350px;
    max-height: 350px;
    background: #ddd;
    margin-right: 16px;
    background-size: cover !important;
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
  }

  @media screen and (min-width: 768px) {
    .profile .image {
      margin-right: 16px !important;
    }
  }
</style>

{#if user !== null && Object.keys(user).length}
  <div class="profile">
    <div>
      <div class="profile-head">
        <div>
          {#if Object.keys(user).length}
            <div
              class="image"
              style="background: url({user.image}); borderRadius: 50%;marginRight: unset;" />
          {/if}
        </div>
        <div style=" text-align: center">
          <div style=" marginTop: 16px">
            <h3>{user.name}</h3>
          </div>
          <div>{user.email}</div>
          <div>
            {#if $auth.user && $auth.user._id === user._id}
              <a href="/profile/edit/{user._id}"> Edit profile </a>
            {/if}
          </div>
        </div>
      </div>
      <div class="user-listings">
        <div>
          <h3>Listings</h3>
        </div>
        <div>
          {#if user.properties && user.properties.length}
            {#each user.properties as property (property._id)}
              <Property {property} edit={true} {refetch} />
            {:else}
              <h6>
                {$auth.user._id === user._id ? 'You have ' : `${user.name} has `}
                not listed any property
              </h6>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
