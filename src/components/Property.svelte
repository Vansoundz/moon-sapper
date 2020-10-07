<script lang="ts">
  import { likeProperty } from "../api/property.api";

  import type PropertyModel from "../models/PropertyModel";
  import { auth } from "../store/auth";
  export let property: PropertyModel;
  export let edit: boolean = false;
  export let refetch: () => void;
  const {
    image,
    _id,
    bathrooms,
    bedrooms,
    location,
    likes,
    title,
    price,
    user,
    description,
  } = property;
  //   const user = $auth.user;
</script>

<style>
  .property {
    display: flex;
    flex: 1 1 300px;
    align-items: center;
    margin: 8px 16px 32px 0;
    flex-wrap: wrap;
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
  }

  .pdetails {
    max-width: 350px;
    padding: 16px 0;
  }

  .pdetails > div:not(:last-child) {
    padding: 8px 0;
    border-bottom: 1px solid #e8e8e8;
  }
</style>

<div>
  <div class="property">
    <div>
      <div class="image" style="background: url({image})">
        {#if $auth.user}
          <div
            style="display: flex;flex-direction: column;justify-content: space-between">
            <div
              style="padding: 8px;background: #0000005f;color: #fff;height: 40px;">
              <span
                on:click={async () => {
                  let res = await likeProperty(property._id);
                  if (res?.msg && refetch) {
                    refetch();
                  }
                }}>
                <span class="material-icons">
                  {likes.includes($auth.user._id || '') ? 'favorite' : 'favorite_border'}
                </span>
              </span>
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="pdetails">
      <div style="font-size: 20px"><a href="property/{_id}"> {title} </a></div>
      <div style="font-size: 14px;font-weight: 300;text-align: justify;">
        {`${description.substr(0, 100)}...`}
      </div>
      <div style=" display: flex">
        <span style=" display: flex">
          <span>{bedrooms}</span>
          <div
            style=" color: #666; font-size: 20px; marginLeft: 4px "
            class="material-icons">
            hotel
          </div>
        </span>
        <span style=" display: flex; marginLeft: 16px ">
          <span>{bathrooms}</span>
          <div
            style=" color: #666; font-size: 20px; marginLeft: 4px "
            class="material-icons">
            bathtub
          </div>
        </span>
      </div>
      <div>Ksh {price}</div>
      <div>{location}</div>

      <div>
        {#if edit && $auth.user && $auth.user._id === user._id}
          <div style="padding: 8px">
            <a href="property/edit/{_id}" class="material-icons">edit</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
