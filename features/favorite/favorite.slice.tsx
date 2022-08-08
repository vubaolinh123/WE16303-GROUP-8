import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFavoriteMedia, getListFavoriteMovie, getListFavoriteTv, removeFavoriteMedia } from "../../api/favorite";
import { IFavoriteMedia } from "../../models/type";


interface IState {
  listfavorite: {listfavoritemovie: any[],listfavoritetv: any[]},
  error: any
}

export const initialState: IState = {
  listfavorite: {listfavoritemovie: [], listfavoritetv: []},
  error: {}
};

// Action;

export const addmedia = createAsyncThunk(
  "favorite/addmedia",
  async (item: IFavoriteMedia) => {
    await addFavoriteMedia(item);
  }
);

export const getlistfavorite = createAsyncThunk(
  "favorite/getlistfavorite",
  async (id: string) => {
    const { data: listfavoritemovie } = await getListFavoriteMovie(id);   
    const { data: listfavoritetv } = await getListFavoriteTv(id); 
    return {listfavoritemovie, listfavoritetv};
  }
);

export const removefavorite = createAsyncThunk(
  "favorite/removefavorite",
  async (item: IFavoriteMedia) => {
    await removeFavoriteMedia(item);
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addmedia.fulfilled, (state, action) => {
    });
    builder.addCase(removefavorite.fulfilled, (state, action) => {
    });
    builder.addCase(removefavorite.rejected, (state, action) => {
      state.error = action.error
    });
    builder.addCase(addmedia.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getlistfavorite.fulfilled, (state, action) => {
      state.listfavorite = action.payload;
    });
  },
});


export default favoriteSlice.reducer;
