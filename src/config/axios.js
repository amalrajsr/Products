import axios from "axios";

const BASEURL = "http://fakestoreapi.in/";

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance;
