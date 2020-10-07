<script lang="ts">
  import { onMount } from "svelte";
  import { loginUser } from "../api/auth.api";
  import Cookies from "js-cookie";
  import { auth } from "../store/auth";
  import { goto } from "@sapper/app";

  const user = { username: "", password: "" };
  var ufeed, pfeed;

  onMount(() => {
    ufeed = document.querySelector(".error.username");
    pfeed = document.querySelector(".error.password");
  });

  $: {
    if ($auth.user) {
      goto("listings");
    }
  }

  const login = async () => {
    ufeed!.textContent = "";
    pfeed!.textContent = "";

    let { username, password } = user;
    if (!username) {
      ufeed.textContent = "Username is required";
    } else if (!password) {
      pfeed.textContent = "Password is required";
    } else if (password.length < 6) {
      pfeed.textContent = "Password must be 6 or more characters";
    } else {
      const { password, username } = user;
      const res = await loginUser(username, password);

      if (res?.user) {
        Cookies.set("auth", res.token);
        auth.login(res.user);
      }
      if (res?.errors) {
        res.errors.forEach((error) => {
          if (error.param === "username") {
            ufeed.textContent = error.msg;
          }
          if (error.param === "password") {
            pfeed.textContent = error.msg;
          }
        });
      }
    }

    setTimeout(() => {
      if (ufeed) ufeed.textContent = "";
      if (pfeed) pfeed.textContent = "";
    }, 4000);
  };
</script>

<form on:submit|preventDefault={login} class="auth">
  <div>
    <div>
      <h4>Login</h4>
      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons">person</span>
          <input
            class="uk-input"
            type="text"
            placeholder="username"
            bind:value={user.username}
            id="username" />

          <div class="error username" />
        </div>
      </div>

      <div class="">
        <div class="form-item">
          <span class="form-icon material-icons ">lock</span>
          <input
            class="uk-input"
            type="password"
            placeholder="password"
            id="password"
            bind:value={user.password} />

          <div class="error password" />
        </div>
      </div>

      <button type="submit" class="uk-button"> Log in </button>
    </div>
  </div>
</form>
