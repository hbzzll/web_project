import { RadarChartOutlined } from "@ant-design/icons";
import { createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/request";

const usetStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token_key") || "",
  },

  reducers: {
    setToken(state, action) {
      state.token = action.payload;

      //store in loacalstorage
      localStorage.setItem("token_key", action.payload);
    },
  },
});

const { setToken } = usetStore.actions;

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
  msg: string;
  token: string;
}

const fetchSignup = (signupForm: signupForm) => {
  return async (dispatch: (action: any) => void) => {
    const res: LoginResponse = await request.post("/api/signup", signupForm);
    dispatch(setToken(res.token));
  };
};

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: (action: any) => void) => {
    try {
      const res: LoginResponse = await request.post("/api/login", loginForm);
      dispatch(setToken(res.token));
      return { success: true, token: res.token };
    } catch (err: any) {
      // 登录失败
      console.error("登录失败：", err);
      return {
        success: false,
        error: err.response?.data?.error || "Login failed",
      };
    }
  };
};

export { fetchSignup, fetchLogin, setToken };

export default userReducer;
