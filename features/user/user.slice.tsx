import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signinwithnextauth } from "../../api/auth";
import { IUser } from "../../models/type";

interface IUserState {
  value: {token: string, user: IUser};
}

const initialState: IUserState = {
  value: {token: "", user: {email: '', password: ""}}
};

// Action
export const login = createAsyncThunk("user/signin", async (user: IUser) => {
  try {
    const { data } = await signin(user);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.response.data.message)
  }
});
export const loginwithnextauth = createAsyncThunk("user/signinwithnextauth", async (user: any) => {
  try {
    const { data } = await signinwithnextauth(user);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.message.data)
  }
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
