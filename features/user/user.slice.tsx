import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signinwithnextauth } from "../../api/auth";
import { IUser } from "../../models/type";

interface IUserState {
  value: IUser;
}

const initialState: IUserState = {
  value: { email: "", password: "" },
};

// Action
export const login = createAsyncThunk("signin", async (user: IUser) => {
  const { data } = await signin(user);
  return data;
});
export const loginwithnextauth = createAsyncThunk("signinwithnextauth", async (user: IUser) => {
  const { data } = await signinwithnextauth(user);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(loginwithnextauth.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export default userSlice.reducer;
