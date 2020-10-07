<script lang="ts" context="module">
  import { getProperty } from "../../api/property.api";

  export async function preload(page, session) {
    const { id } = page.params;
    try {
      let resp = await getProperty(id);
      if (resp.property) return resp;
      return { property: {} };
    } catch (error) {
      return { property: {} };
    }
  }
</script>

<script lang="ts">
  import type Property from "../../models/PropertyModel";
  import { auth } from "../../store/auth";

  export let property: Property = {};
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

<div class="property">
  <div>
    <div class="image" style="background: url({property.image})">
      <div
        style="padding: 8px; background: #0000005f;color: #fff; height: 40px">
        <span>
          <span class="material-icons">
            {#if property.likes && $auth.user}
              {property.likes.includes($auth.user._id) ? 'favorite' : 'favorite_border'}
            {/if}
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="pdetails">
    <div style="font-size: 20px">{property.title}</div>
    <div style="font-size: 14px;font-weight: 300;text-align: justify">
      {property.description ? `${property.description}` : 'Property description'}
    </div>
    <div style=" display: flex">
      <span style=" display: flex">
        <span>{property.bedrooms}</span>
        <div class="material-icons">hotel</div>
      </span>
      <span style=" display: flex; margin-left: 16px">
        <span>{property.bathrooms}</span>
        <div class="material-icons">bathtub</div>
      </span>
    </div>
    <div>Ksh {property.price}</div>
    <div>{property.location}</div>
  </div>
</div>
