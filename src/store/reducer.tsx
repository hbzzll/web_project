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

interface LoginResponse {
  msg: string;
  token: string;
}

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: (action: any) => void) => {
    const res: LoginResponse = await request.post("/api/register", loginForm);
    dispatch(setToken(res.token));
  };
};

export { fetchLogin, setToken };

export default userReducer;
