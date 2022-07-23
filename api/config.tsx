import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: { api_key: "aaa6da55e3c5a4fcac2c50e20c2f5c51" },
});
export default instance;
