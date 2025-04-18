import { createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/request";

const usetStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token_key") || "",
    isAuth: !!localStorage.getItem("token_key"),
    name: "",
  },

  reducers: {
    setUser(state, action) {
      const { token, name } = action.payload;
      state.token = token;
      state.name = name;
      state.isAuth = !!token; // = Boolean()
      localStorage.setItem("token_key", token);
    },
    logout(state) {
      state.token = "";
      state.name = "";
      state.isAuth = false;
      localStorage.removeItem("token_key");
    },
  },
});

const { setUser, logout } = usetStore.actions;

const userReducer = usetStore.reducer;

// Define the type for loginForm
interface LoginForm {
  email: string;
  password: string;
}

interface signupForm {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
  name: string;
}

const fetchSignup = (signupForm: signupForm) => {
  return async (dispatch: (action: any) => void) => {
    const res: LoginResponse = await request.post("/api/signup", signupForm);
  };
};

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: (action: any) => void) => {
    try {
      const res: LoginResponse = await request.post("/api/login", loginForm);
      dispatch(setUser({ token: res.token, name: res.name }));
      return res;
    } catch (err: any) {
      console.error("登录失败：", err);
      return {
        success: false,
        error: err.response?.data?.error || "Login failed",
      };
    }
  };
};

export { fetchSignup, fetchLogin, setUser, logout };

export default userReducer;
