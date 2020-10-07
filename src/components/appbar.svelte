<script lang="ts">
  import { auth } from "../store/auth";
  import { fly } from "svelte/transition";
  let open: boolean = false;

  const closeM = () => {
    open = !open;
  };
</script>

<style>
  .appbar {
    position: sticky;
    top: 0;
    left: 0;
    padding: 16px;
    display: block;
    background-color: #ffffff;
    z-index: 10;
  }

  .appbar-wrapper {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-items: center;
  }
  .sm {
    display: none;
  }

  .lg {
    display: block;
  }

  .menu {
    display: none;
  }

  .logo-svg {
    width: 16px;
    height: 16px;
    stroke: #5e2af1;
    fill: #5e2af1;
  }

  @media screen and (max-width: 768px) {
    .menu {
      display: block;
      position: fixed;
      z-index: 1000;
      width: 100%;
      height: calc(100% - 50px);
      background: #fff;
    }

    li.npad {
      padding: 8px 0 8px 16px;
    }

    .sm {
      display: block;
    }

    .lg {
      display: none;
    }

    .appbar-wrapper {
      justify-content: space-between;
    }
  }
</style>

<div class="appbar">
  <div class="appbar-wrapper">
    <div class="logo sm">
      <a href="/">
        MO
        <object
          aria-label=""
          data="moon.svg"
          class="logo-svg"
          width="16px"
          height="16px"
          type="image/svg+xml"
          style="transform: rotateZ(180deg)">
          O
        </object>
        N
      </a>
    </div>
    <div class="menu-icon sm">
      <div class="material-icons" on:click={closeM}>
        {open ? 'close' : 'menu'}
      </div>
    </div>
    <div class="account lg">
      {#if $auth.user}
        <a class="material-icons" href="profile/{$auth.user._id}">
          account_circle
        </a>
        <span on:click={() => auth.logout()} class="material-icons">
          power_settings_new
        </span>
      {:else}<a href="login"> Log In </a> <a href="register"> Sign Up </a>{/if}
    </div>
  </div>
</div>
{#if open}
  <div class="menu" in:fly={{ y: -150 }} out:fly={{ y: 150 }}>
    <div>
      <ul id="menu-items">
        <li class="npad" on:click={closeM}>
          <a href="create-property">Sell</a>
        </li>
        <li class="npad" on:click={closeM}><a href="find">Find</a></li>
        <li class="npad" on:click={closeM}><a href="/">Home</a></li>
        <li class="npad" on:click={closeM}><a href="listings">Listings</a></li>
        {#if $auth.user}
          <li on:click={closeM} class="npad">
            <a href="profile/{$auth.user._id}"> Profile </a>
          </li>
        {:else}
          <li class="npad">
            <a on:click={closeM} href="/login">Log In</a>
            <a on:click={closeM} href="/register" style="marginLeft: 12px">
              Sign Up
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
{/if}
