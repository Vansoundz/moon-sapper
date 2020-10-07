<script lang="ts" context="module">
  import { getUserById, updateUserProfile } from "../../../api/auth.api";
  export async function preload(page, _) {
    const { id } = page.params;

    try {
      let resp = await getUserById(id);

      if (resp.user) return resp;
      return { user: {} };
    } catch (error) {
      console.log(error);
      return { user: {} };
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import type User from "../../../models/UserModel";
  var ffeed;

  onMount(() => {
    ffeed = document.querySelector(".error.name");
  });

  export let user: User = {};

  if (!user.socialMedia) {
    user.socialMedia = {};
  }

  let profile: File;

  const updateProfile = async () => {
    let { name } = user;
    if (!name) {
      ffeed!.textContent = "Name is required";
    } else {
      let resp = await updateUserProfile(user);
      if (resp?.user) {
        goto(`profile/${resp.user._id}`);
      }
    }

    setTimeout(() => {
      if (ffeed) ffeed.textContent = "";
    }, 4000);
  };
</script>

<style>
</style>

<form class="auth" on:submit|preventDefault={updateProfile}>
  <div style="display: flex">
    <div style="margin: auto">
      <h4>Update profile</h4>

      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons">person</span>
          <input
            class="uk-input"
            type="text"
            placeholder="full name"
            id="name"
            bind:value={user.name} />

          <div class="error name" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <object
            aria-label=""
            data="facebook.svg"
            class="logo-svg form-icon social-icon"
            type="image/svg+xml"
            style="margin-top: 10px">
            f
          </object>
          <input
            class="uk-input"
            type="text"
            placeholder="https://facebook.com/username"
            bind:value={user.socialMedia.facebook}
            id="facebook" />

          <div class="error facebook" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <object
            aria-label=""
            data="twitter.svg"
            class="logo-svg form-icon social-icon"
            type="image/svg+xml"
            style="margin-op: 10px">
            t
          </object>
          <input
            class="uk-input"
            type="text"
            placeholder="https://twiter.com/username"
            bind:value={user.socialMedia.twitter}
            id="twitter" />

          <div class="error twitter" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <object
            aria-label=""
            data="instagram.svg"
            class="logo-svg form-icon social-icon"
            type="image/svg+xml"
            style="margin-top: 10px">
            f
          </object>
          <input
            class="uk-input"
            type="text"
            placeholder="https://instagram.com/username"
            bind:value={user.socialMedia.instagram}
            id="instagram" />

          <div class="error instagram" />
        </div>
      </div>

      <div class="file-field ">
        {#if profile}
          <div style="display: flex, justify-content: space-between">
            <div style="font-size: 12px">
              Selected file:
              <span>{profile.name}</span>
            </div>
            <div on:click={() => (profile = undefined)} class="material-icons">
              close
            </div>
          </div>
        {:else}
          <div class="">
            <label style="cursor: pointer" for="file"> Select file </label>
            <input
              type="file"
              id="file"
              name="files"
              hidden={true}
              multiple
              on:change={(e) => {
                //@ts-ignore
                const files = e.target.files;

                if (files) {
                  profile = files[0];
                }
              }} />
          </div>
        {/if}

        <div class="error file" />
      </div>

      <button class="uk-button">Edit Profile</button>
    </div>
  </div>
</form>
