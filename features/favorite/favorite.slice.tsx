import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addFavoriteMedia, getListFavoriteMedia } from "../../api/favorite";
import { IFavoriteMedia } from "../../models/type";


interface IState {
    value: any[]
}

export const initialState: IState = {
    value: []
};

// Action;

export const addmedia = createAsyncThunk(
  "favorite/addmedia",
  async (item: IFavoriteMedia) => {
    const { data } = await addFavoriteMedia(item);
    return data;
  }
);

export const getlistmedia = createAsyncThunk(
  "favorite/getlistmedia",
  async (id: string) => {
    const { data } = await getListFavoriteMedia(id);    
    return data;
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addmedia.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getlistmedia.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});


export default favoriteSlice.reducer;
