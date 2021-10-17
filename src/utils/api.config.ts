import axios from "axios";

// export const BASE_URL = "http://localhost:3000";
export const BASE_URL =
  "https://design-backend-csctorpry-yashverma2110.vercel.app";

export const client = axios.create({
  baseURL: BASE_URL,
});
