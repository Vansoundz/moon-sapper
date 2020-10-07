<script lang="ts" context="module">
  import { getProperty, updateProp } from "../../../api/property.api";

  export async function preload(page, _) {
    const { id } = page.params;
    try {
      let res = await getProperty(id);
      if (res.property) return res;
      return { property: {} };
    } catch (error) {
      return { property: {} };
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import type Property from "../../../models/PropertyModel";
  var tfeed, pfeed, dfeed, lfeed, ffeed, bdfeed, btfeed;

  onMount(() => {
    {
      tfeed = document.querySelector(".error.title");
      pfeed = document.querySelector(".error.price");
      dfeed = document.querySelector(".error.description");
      lfeed = document.querySelector(".error.location");
      ffeed = document.querySelector(".error.file");
      bdfeed = document.querySelector(".error.bedrooms");
      btfeed = document.querySelector(".error.bathrooms");
    }
  });

  const resetFields = () => {
    setTimeout(() => {
      if (tfeed) tfeed.textContent = "";
      if (dfeed) dfeed.textContent = "";
      if (pfeed) pfeed.textContent = "";
      if (lfeed) lfeed.textContent = "";
      if (ffeed) ffeed.textContent = "";
      if (bdfeed) bdfeed.textContent = "";
      if (btfeed) btfeed.textContent = "";
    }, 4000);
  };

  export let property: Property = {};

  const editProperty = async () => {
    const {
      title,
      price,
      description,
      location,
      bathrooms,
      bedrooms,
    } = property;

    if (!title) {
      tfeed!.textContent = "Title is required";
    } else if (!price) {
      pfeed!.textContent = "Price is required";
    } else if (!description) {
      dfeed!.textContent = "Description is required";
    } else if (!location) {
      lfeed!.textContent = "Location is required";
    } else if (!bathrooms) {
      btfeed!.textContent = "Bathrooms is required";
    } else if (!bedrooms) {
      bdfeed!.textContent = "Bedrooms is required";
    } else {
      let res = await updateProp(property);

      if (res?.property) {
        goto("listings");
      }
    }
    resetFields();
  };
</script>

<style>
</style>

<div class="center">
  <form on:submit|preventDefault={editProperty}>
    <div class="row" style="display: flex">
      <div class="col s12 m8 l6" style="margin: auto">
        <h4>Create property</h4>
        <div>
          <div class="form-item">
            <input
              class="pl8"
              type="text"
              placeholder="Title"
              bind:value={property.title}
              id="title" />

            <div class="error title" />
          </div>
        </div>
        <div>
          <div class="form-item">
            <input
              class="pl8"
              type="number"
              placeholder="Price"
              bind:value={property.price}
              id="price" />

            <div class="error price" />
          </div>
        </div>
        <div>
          <div class="form-item">
            <input
              class="pl8"
              type="text"
              placeholder="Location"
              bind:value={property.location}
              id="location" />

            <div class="error location" />
          </div>
        </div>
        <div
          style="display: grid,
                  gridTemplateColumns: 1fr 1fr,
                  gridColumnGap: 8px,
              ">
          <div class="form-item">
            <input
              class="pl8"
              type="number"
              placeholder="Bedrooms"
              bind:value={property.bedrooms}
              id="bedrooms" />

            <div class="error bedrooms" />
          </div>
          <div class="form-item">
            <input
              class="pl8"
              type="number"
              placeholder="Bathrooms"
              bind:value={property.bathrooms}
              id="bathrooms" />

            <div class="error bathrooms" />
          </div>
        </div>
        <div>
          <div class="form-item">
            <textarea
              placeholder="Description"
              bind:value={property.description}
              id="description"
              rows={3} />

            <div class="error description" />
          </div>
        </div>

        <div class="file-field ">
          {#if property.file}
            <div style="display: flex, justify-content: space-between">
              <div style="font-size: 12px">
                Selected file:
                <span>{property.file.name}</span>
              </div>
              <div
                on:click={() => (property.file = undefined)}
                class="material-icons">
                close
              </div>
            </div>
          {:else}
            <div>
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
                    property.file = files[0];
                  }
                }} />
            </div>
          {/if}

          <div class="error file" />
        </div>

        <button style="margin-top: 10px" type="submit" class="btn">
          Create property
        </button>
      </div>
    </div>
  </form>
</div>
