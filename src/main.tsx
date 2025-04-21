import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "reset-css/reset.css";

//全局样式
import "@/assets/styles/global.scss";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
