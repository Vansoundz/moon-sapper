<script lang="ts" context="module">
  import { searchProperty } from "../api/property.api";
  export async function preload(page, _) {
    let { query } = page.query;
    query = query.split("+").join(" ");
    try {
      const res = await searchProperty(query);

      if (res.properties) return { ...res, query };
      return { properties: [], query };
    } catch (error) {
      return { properties: [], query };
    }
  }
</script>

<script lang="ts">
  import Property from "../components/Property.svelte";
  export let properties = [];
  export let query = "";

  const refetch = async () => {
    let resp = await searchProperty(query);
    if (resp.properties) {
      properties = resp.properties;
    }
  };
</script>

<svelte:head>
  <title>Search property</title>
</svelte:head>

<main>
  <div style="margin: 16px" id="search-page">
    <h4>Search results</h4>

    {#each properties as property (property._id)}
      <div>
        <Property {property} {refetch} />
      </div>
    {:else}
      <h4>Oops, we could find any property, try another term</h4>
    {/each}
  </div>
</main>
