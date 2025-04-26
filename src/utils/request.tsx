import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    const authKeywords = ["/user"];
    const url = config.url || "";
    const needAuth = authKeywords.some((keyword) => url.includes(keyword));

    if (needAuth) {
      const token = localStorage.getItem("token_key");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
    }

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
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        window.location.href = "/";
      }
    }
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
