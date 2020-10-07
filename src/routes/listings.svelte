<script context="module" lang="ts">
  import { getProperties } from "../api/property.api";
  export async function preload() {
    try {
      let resp = await getProperties();
      if (resp) return { properties: resp };
      return { properties: [] };
    } catch (error) {
      return { properties: [] };
    }
  }
</script>

<script lang="ts">
  import type Property from "../models/PropertyModel";
  import Listing from "../components/Listing.svelte";
  export let properties: Property[] = [];
</script>

<style>
</style>

<div style="padding: 16px">
  <h4>Listings</h4>
  <div class="listings">
    {#each properties as property}
      <Listing {property} />
    {:else}
      <h3>ooops, we could not find any property now</h3>
    {/each}
  </div>
</div>
