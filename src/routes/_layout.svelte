<script lang="ts">
  import { onMount } from "svelte";
  import { getUser } from "../api/auth.api";

  import Navigation from "../components/navigation.svelte";
  import Appbar from "../components/appbar.svelte";
  import { auth } from "../store/auth";
  import Loading from "../components/loading.svelte";

  onMount(async () => {
    let res = await getUser();

    if (res?.user) {
      auth.login(res.user);
    } else {
      auth.logout();
    }
  });
</script>

<style>
</style>

<svelte:head>
  <meta property="og:title" content="Moon properties" />
  <meta
    property="og:description"
    content="Moon properties:Showcase your properties, create account and list your properties" />
  <meta property="og:url" content="https://moon-sv.netlify.app" />
  <meta property="og:image" content="https://moon-sv.netlify.app/moon.svg" />
  <meta property="title" content="Moon properties" />
  <meta
    property="description"
    content="Moon properties:Showcase your properties, create account and list your properties" />
  <meta property="url" content="https://moon-sv.netlify.app" />
  <meta property="image" content="https://moon-sv.netlify.app/moon.svg" />
</svelte:head>

{#if !$auth.initialized}
  <Loading />
{/if}

<div class="app">
  <Navigation />
  <div class="">
    <Appbar />
    <slot />
  </div>
</div>
