<script lang="ts">
  import { searchProperty } from "../api/property.api";
  import { goto } from "@sapper/app";
  import type Property from "../models/PropertyModel";

  let properties: Property[] = [];
  let query: string = "";
  const find = async () => {
    let resp = await searchProperty(query);
    if (resp?.properties) {
      properties = resp.properties;
    }
  };

  const gotoSearch = () => {
    if (query.trim()) {
      const q = query.split(/\s+/gi).join("+");
      goto(`search?query=${q}`);
    }
  };
</script>

<style>
  /* Find */
  .find {
    /* width: calc(100vw - 200px); */
    height: calc(100vh - 300px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .find-wrapper {
    position: relative;
  }

  .suggestions {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    position: absolute;
  }

  .suggestion {
    cursor: pointer;
    margin-top: 8px;
  }

  .suggestion:not(:last-child) {
    border-bottom: 1px solid #ddd;
    padding-bottom: 8px;
  }

  .srch-btn {
    padding: 9px 16px;
    border: none;
    border-radius: 24px;
    background: #ddd;
    box-shadow: unset;
    cursor: pointer;
    position: absolute;
    right: 0;
    border-radius: 0 4px 4px 0;
  }
</style>

<div class="find">
  <div class="find-wrapper">
    <h4>Find your place</h4>
    <form on:submit|preventDefault={gotoSearch}>
      <div class="form-item">
        <span
          class="material-icons form-icon"
          style="margin-top: 7px"
          on:click={gotoSearch}>
          search
        </span>
        <button
          class="srch-btn"
          style="cursor: pointer, box-shadow: unset"
          on:click={gotoSearch}>
          Search
        </button>
        <input
          type="search"
          bind:value={query}
          on:input={(e) => {
            //@ts-ignore
            if (e.target.value.length > 2) {
              find();
            }
          }} />
      </div>
    </form>

    <div>
      {#if properties.length}
        <div class="suggestions">
          {#each properties as property (property._id)}
            <div class="suggestion">
              <a href="/property/{property._id}"> {property.title} </a>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
