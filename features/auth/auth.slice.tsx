import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signinwithnextauth, signup } from "../../api/auth";
import { IUser } from "../../models/type";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";

interface IUserState {
  value: { token: string; user: IUser };
  error: any
}

export const initialState: IUserState = {
  value: { token: "", user: { email: "", password: "" } },
  error: {}
};

// Action
export const login = createAsyncThunk("user/login", async (user: IUser ) => {
  try {
    const { data } = await signin(user);
    toast.success("Đăng nhập thành công");
    return data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
});

export const loginwithnextauth = createAsyncThunk(
  "user/loginwithnextauth",
  async (user: any) => {
    try {
      const { data } = await signinwithnextauth(user);
      toast.success("Đăng nhập thành công");
      return data;
    } catch (error: any) {
      toast.error(error.response.message.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: () => {
      localStorage.removeItem('persist:root');
      signOut();
      toast.success("Đăng xuất thành công")
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(loginwithnextauth.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
