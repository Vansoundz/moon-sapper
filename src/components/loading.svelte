<script>
  import { auth } from "../store/auth";

  export let size = 60;
  export let color = "#5e2af1";
  export let unit = "px";
</script>

<style>
  .wrapper {
    width: calc(var(--size) * 1.3);
    height: calc(var(--size) * 1.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .firework {
    border: calc(var(--size) / 10) dotted var(--color);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    animation: fire 1.25s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  }
  @keyframes fire {
    0% {
      opacity: 1;
      transform: scale(0.1);
    }
    25% {
      opacity: 0.85;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  .loading {
    position: fixed;
    z-index: 1024;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
  }
</style>

<div
  class="loading"
  style="background: {!$auth.initialized ? '#fff' : 'rgba(0, 0, 0, 0.4)'}">
  <div class="wrapper" style="--size: {size}{unit}; --color: {color}">
    <div class="firework" />
  </div>
</div>
