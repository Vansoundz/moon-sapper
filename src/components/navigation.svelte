<script lang="ts">
</script>

<style>
  .navigation {
    position: fixed;
    width: 200px;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .npad:not(li) {
    padding: 16px;
  }

  li.npad {
    padding: 8px 0 8px 16px;
  }
</style>

<div class="nav-wrapper lg">
  <div class="navigation">
    <div class="npad">
      <a href="/">
        MO
        <object
          aria-label=""
          data="moon.svg"
          class="logo-svg social-icon"
          type="image/svg+xml"
          style="transform: rotateZ(180deg)">
          O
        </object>
        N
      </a>
    </div>
    <div>
      <ul>
        <li class="npad"><a href="/create-property"> Sell </a></li>
        <li class="npad"><a href="/find"> Find </a></li>
        <li class="npad"><a href="/"> Home </a></li>
        <li class="npad"><a href="/listings"> Listings </a></li>
      </ul>
    </div>
    <div class="npad social">
      <a
        href="https://www.facebook.com/TurnToGODhehasalltheanswers"
        target="_blank"
        rel="noopener noreferrer">
        <object
          aria-label=""
          data="facebook.svg"
          class="social-icon"
          type="image/svg+xml"
          style="margin-top: 10px">
          f
        </object>
      </a>
      <a
        href="https://twitter.com/silentEvans"
        target="_blank"
        rel="noopener noreferrer">
        <object
          aria-label=""
          data="twitter.svg"
          class="social-icon"
          type="image/svg+xml"
          style="margin-top: 10px">
          t
        </object>
      </a>

      <a
        href="https://www.instagram.com/vansoundz/"
        target="_blank"
        rel="noopener noreferrer">
        <object
          aria-label=""
          data="instagram.svg"
          class="social-icon"
          type="image/svg+xml"
          style="margin-top: 10px">
          i
        </object>
      </a>
    </div>
  </div>
</div>
