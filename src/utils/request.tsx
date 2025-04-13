import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request };
// axios.interceptors.request.use((config) => {
//   const passURL = ["/api/login", "/api/register"];
//   if (passURL.includes(config.url)) return config;

//   const tk = localStorage.getItem("@#@TOKEN");
//   if (tk) {
//     config.headers.Authorization = "Bearer " + tk;
//   } else {
//     delete config.headers.Authorization;
//   }
//   return config;
// });

// axios.interceptors.response.use((response) => {
//   const { status, msg } = response.data;
//   console.log(status, msg);
//   if (status === 1 && msg === "TOKEN ERROR") {
//     window.location.href = "/login";
//   }
//   return response;
// });

// export default axios;
