<script>
</script>

<style>
  .landing {
    min-height: 50vh;
    background-attachment: fixed;
    display: "flex";
    justify-content: "space-evenly";
    align-items: "center";
    flex: "1 0 300px";
    flex-wrap: "wrap";
  }

  .landing {
    width: 90%;
    margin: auto;
  }

  #view-listings {
    border: 1px solid #888;
    padding: 8px;
  }

  #view-listings:hover {
    background: #eee;
  }

  .features-section {
    width: 90%;
    margin: 48px auto;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
    grid-row-gap: 48px;
    grid-column-gap: 16px;
    margin-top: 24px;
  }

  .feature {
    border-radius: 4px;
    box-shadow: 3px 3px 9px #bbb, -3px -3px 9px #eee;
    overflow: hidden;
  }

  .feature > *:not(:first-child) {
    padding: 4px;
    margin-top: 4px;
  }

  .feature > div:first-child {
    width: 100%;
    height: 250px;
    background: #ddd;
  }

  .feature > div:last-child {
    text-align: justify;
  }
</style>

<svelte:head>
  <title>Moon properties</title>
</svelte:head>

<div style="padding: 16px">
  <div class="landing">
    <div style="max-width: 350px">
      <div style="font-weight: 200; font-size: 44px">
        Serene homes for everyone
      </div>
    </div>
    <div style="max-width: 350px">
      <h4>Buy sell property</h4>
      <div style="font-weight: 200;font-size: 14px;margin: 20px 0">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
        molestiae, delectus accusamus distinctio hic, ad aliquam rem eveniet
        accusantium odio commodi ut quod velit tenetur beatae.
      </div>
      <a href="listings" id="view-listings">View listings </a>
    </div>
  </div>
  <div style="background: #fff; min-height: 60vh">
    <div class="features-section">
      <h1>Why choose us</h1>
      <div class="features">
        <div class="feature">
          <div />
          <h4>lorem ipsum</h4>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
            perspiciatis sapiente praesentium omnis nihil consequuntur soluta
            reru
          </div>
        </div>
        <div class="feature">
          <div />
          <h4>lorem ipsum</h4>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
            perspiciatis sapiente praesentium omnis nihil consequuntur soluta
            reru
          </div>
        </div>
        <div class="feature">
          <div />
          <h4>lorem ipsum</h4>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
            perspiciatis sapiente praesentium omnis nihil consequuntur soluta
            reru
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
