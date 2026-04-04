import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { deleteTokenAuth } from "../auth";

export type UserStateI = {
  name: string;
  email: string | null;
  phoneNumber: string | null;
};

export const initialUserExistingState: UserStateI = { 
  name: "",
  email: null,
  phoneNumber: null,
};

const userExisting = createSlice({
  name: "userExisting",
  initialState: initialUserExistingState,
  reducers: {
    setUserExisting(state, { payload }: PayloadAction<UserStateI>) {
      state.name = payload.name ?? "";
      state.email = payload.email ?? null;
      state.phoneNumber = payload.phoneNumber ?? null;
    },
    clearUserExisting: () => initialUserExistingState,
  }
});

export const { setUserExisting, clearUserExisting } = userExisting.actions;
export default userExisting.reducer;
