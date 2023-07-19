import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-backend-iota.vercel.app",
  // "http://127.0.0.1:5001/clone-e0cb0/us-central1/api",
});

export default instance;
