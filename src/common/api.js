// Base API Configuration

import axios from "axios";

export const API = axios.create({
  baseURL: "//api.openweathermap.org/data/2.5/"
});

API.interceptors.request.use(
  function(config) {
    // Set common parameters for each request to the API.

    config.params.APPID = "4320ca7464b74eac4859756f38aedc49";
    config.params.units = "imperial";

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
