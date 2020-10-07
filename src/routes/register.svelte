<script lang="ts">
  import { onMount } from "svelte";

  import type User from "../models/UserModel";
  const user: User = {};
  let password: string = "";
  var ufeed, pfeed, ffeed, efeed, rfeed;

  onMount(() => {
    ufeed = document.querySelector(".error.username");
    pfeed = document.querySelector(".error.password");
    ffeed = document.querySelector(".error.name");
    efeed = document.querySelector(".error.email");
    rfeed = document.querySelector(".error.pass");
  });

  const signUp = () => {
    let { username, name, email } = user;
    if (!username) {
      ufeed!.textContent = "Username is required";
    } else if (!email) {
      efeed!.textContent = "Email is required";
    } else if (!password) {
      pfeed!.textContent = "Password is required";
    } else if (!name) {
      ffeed!.textContent = "Name is required";
    } else if (password.length < 6) {
      pfeed!.textContent = "Password must be 6 or more characters";
    } else if (user.password !== password) {
      rfeed!.textContent = "Passwords do not match";
    } else {
      console.log(user);
    }

    setTimeout(() => {
      if (ufeed) ufeed.textContent = "";
      if (efeed) efeed.textContent = "";
      if (pfeed) pfeed.textContent = "";
      if (rfeed) rfeed.textContent = "";
      if (ffeed) ffeed.textContent = "";
    }, 4000);
  };
</script>

<style>
</style>

<form on:submit|preventDefault={signUp} class="auth">
  <div>
    <div>
      <h4>Register</h4>
      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons">person</span>
          <input
            bind:value={user.username}
            class="uk-input"
            type="text"
            placeholder="username"
            id="username" />

          <div class="error username" />
        </div>
      </div>
      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons">email</span>
          <input class="uk-input" type="text" placeholder="email" id="email" />

          <div class="error email" />
        </div>
      </div>
      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons">person</span>
          <input
            bind:value={user.name}
            class="uk-input"
            type="text"
            placeholder="full name"
            id="name" />
          <div class="error name" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons ">lock</span>
          <input
            bind:value={user.password}
            class="uk-input"
            type="password"
            placeholder="password"
            id="password" />
          <div class="error password" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons ">lock</span>
          <input
            bind:value={password}
            class="uk-input"
            type="password"
            placeholder="repeat password"
            id="pass" />
          <div class="error pass" />
        </div>
      </div>

      <button class="uk-button">Sign up</button>
    </div>
  </div>
</form>
