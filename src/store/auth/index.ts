import type { LoginResI } from "@/_interfaces/auth.interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface ProfileI {
  id: string;
}

export interface AuthStateI {
  loading: boolean;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  success: boolean;
  phoneNumber?: string;
}

const initialState: AuthStateI = {
  loading: false,
  accessToken: undefined,
  error: undefined,
  success: false,
};

type LoginInfoPayload = {
  payload: LoginResI;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokenAuth: (state: AuthStateI, { payload }: LoginInfoPayload) => {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
    },
    deleteTokenAuth: (state) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const { saveTokenAuth, deleteTokenAuth } = authSlice.actions;

export default authSlice.reducer;
