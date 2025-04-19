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
  category?: string;
  message?: string;
  token?: string;
  name?: string;
}

interface SignupResponse {
  success: boolean;
  msg: string;
}

const fetchSignup = async (signupForm: signupForm) => {
  const res: SignupResponse = await request.post("/api/signup", signupForm);
  return res;
};

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: (action: any) => void) => {
    try {
      const res: LoginResponse = await request.post("/api/login", loginForm);
      dispatch(setUser({ token: res.token, name: res.name }));
      return res;
    } catch (err: any) {
      return {
        success: false,
        category: err.response?.data?.category || null,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };
};

export { fetchSignup, fetchLogin, setUser, logout };

export default userReducer;
