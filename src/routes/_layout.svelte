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
  <link rel="stylesheet" href="" />
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
