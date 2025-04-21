import { request } from "./utils/request";
import "./App.css";
import HomePage from "./view/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { setUser, logout } from "./store/reducer";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token_key");

    if (token) {
      request
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(
            setUser({
              token,
              name: res.name,
              email: res.email,
              profile: res.profile,
            })
          );
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, []);

  return <HomePage />;
}

export default App;
