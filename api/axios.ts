import axios from "axios";

export const TechHiveAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
});
