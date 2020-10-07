<script lang="ts">
  import type PropertyModel from "../models/PropertyModel";
  import { auth } from "../store/auth";

  export let property: PropertyModel;
  const {
    image,
    _id,
    bathrooms,
    bedrooms,
    likes,
    title,
    price,
    location,
  } = property;
</script>

<style>
  .listing {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 6px #ddd;
    margin: 8px 16px 16px 0;
    border-radius: 8px;
    overflow: hidden;
  }

  .l-image {
    width: 100%;
    height: 270px;
    background-size: cover !important;
    display: flex;
    justify-content: flex-end;
  }

  .l-body {
    padding: 8px;
  }
</style>

<div class="listing">
  <div>
    <div class="l-image" style="background: url({image})">
      {#if $auth.user}
        <div
          style="padding: 8px;background: #0000005f;color: #fff;height: 40px">
          <span>
            <span class="material-icons">
              {likes.includes($auth.user._id || '') ? 'favorite' : 'favorite_border'}
            </span>
          </span>
        </div>
      {/if}
    </div>
  </div>
  <div class="l-body">
    <div class="lb-title"><a href="/property/{_id}"> {title} </a></div>
    <div class="lb-title">{location}</div>
    <div style=" display:flex">
      <span style=" display: flex">
        <span>{bedrooms}</span>
        <div
          style=" color: #666; font-size: 20px; margin-left: 4px"
          class="material-icons">
          hotel
        </div>
      </span>
      <span style=" display: flex; margin-left: 1">
        <span>{bathrooms}</span>
        <div
          style=" color: #666; font-size: 20px; margin-left: 8px"
          class="material-icons">
          bathtub
        </div>
      </span>
    </div>
    <div class="lb-title">Ksh {price}</div>
  </div>
</div>
