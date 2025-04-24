import { createSlice } from "@reduxjs/toolkit";
import { request } from "../utils/request";

interface UserProfile {
  name?: string;
  contactEmail?: string;
  phone?: string;
  intro?: string;
  gender?: string;
  avatar?: string;
  favourites?: [any];
  process?: [any];
}

interface UserState {
  token: string;
  isAuth: boolean;
  name: string;
  email: string;
  profile: UserProfile;
}

const initialState: UserState = {
  token: localStorage.getItem("token_key") || "",
  isAuth: !!localStorage.getItem("token_key"),
  name: "",
  email: "",
  profile: {},
};

const usetStore = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action) {
      const { token, name, email, profile } = action.payload;
      state.token = token;
      state.name = name;
      state.email = email;
      state.isAuth = !!token; // = Boolean()
      state.profile = profile;
      localStorage.setItem("token_key", token);
    },
    updateFavourites(state, action) {
      state.profile.favourites = action.payload;
    },
    updateProcess(state, action) {
      state.profile.process = action.payload;
    },
    logout(state) {
      state.token = "";
      state.name = "";
      state.email = "";
      state.profile = {};
      state.isAuth = false;
      localStorage.removeItem("token_key");
    },
  },
});

const { setUser, logout, updateFavourites, updateProcess } = usetStore.actions;

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
  email?: string;
  profile?: {};
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
      dispatch(
        setUser({
          token: res.token,
          name: res.name,
          email: res.email,
          profile: res.profile,
        })
      );
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

export {
  fetchSignup,
  fetchLogin,
  setUser,
  logout,
  updateFavourites,
  updateProcess,
};

export default userReducer;
