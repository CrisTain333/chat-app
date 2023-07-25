/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { IInitialState } from "../../types";
import { getUserProfile } from "../../../api";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (token: string) => {
    const response = await getUserProfile(token);
    return response;
  }
);

const initialState: IInitialState = {
  user: null,
  token: localStorage.getItem("token") || "",
  friends: [],
  isLoading: false,
  error: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action?.payload?.data;
        state.friends = action?.payload?.data?.friends;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.error.message!;
        state.token = "";
        localStorage.removeItem("token");
      });
  },
});

export const { setUser, setToken, logout } =
  authSlice.actions;

export default authSlice.reducer;
