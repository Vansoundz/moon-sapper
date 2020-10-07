import { writable } from "svelte/store";
import type UserModel from "../models/UserModel";
import cookies from "js-cookie";

const createAuth = () => {
  const { subscribe, set, update } = writable<{
    user: UserModel | null;
    initialized: boolean;
  }>({ initialized: false, user: null });

  return {
    subscribe,
    login: (user: object) =>
      update((auth) => {
        return { user, initialized: true };
      }),
    logout: () => {
      cookies.remove("auth");
      update((auth) => {
        return { user: null, initialized: true };
      });
    },
  };
};

export const auth = createAuth();
