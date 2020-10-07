import Axios from "axios";
// import { config } from "dotenv";
import cookies from "js-cookie";
import type User from "../models/UserModel";

// config({ path: "../.env" });

// const api = process.env.URI;
const api = "https://moon-back.herokuapp.com";
const headers = {
  headers: {
    "moon-auth": cookies.get("auth"),
  },
};

const getUser = async () => {
  try {
    let resp = (await Axios.get(`${api}/api/users`, headers)).data;
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginUser = async (username: string, password: string) => {
  try {
    const res = (
      await Axios.post(`${api}/api/users/login`, { username, password })
    ).data;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    let res = (await Axios.get(`${api}/api/users/${id}`)).data;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateUserProfile = async (user: User, file?: File) => {
  try {
    let form = new FormData();
    form.append("name", user.name);
    // @ts-ignore
    form.append("socialMedia", user.socialMedia);
    if (file) {
      form.append("image", file);
    }
    let res = (await Axios.patch(`${api}/api/users`, form, headers)).data;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getUser, loginUser, getUserById, updateUserProfile };
