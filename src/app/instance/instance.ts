import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "b734f935-8f45-42f4-91eb-de7c6d1a1d96",
  },
});
