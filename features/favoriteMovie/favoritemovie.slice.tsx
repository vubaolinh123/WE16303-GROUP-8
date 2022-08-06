import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFavoriteMovie, getListFavoriteMovie } from "../../api/favoritemovie";


interface IState {
    value: any[]
}

export const initialState: IState = {
    value: []
};

// Action;

export const addmovie = createAsyncThunk(
  "favoriteMovie/addmovie",
  async (id: string) => {
    const { data } = await addFavoriteMovie(id);
    return data;
  }
);

export const getlistmovie = createAsyncThunk(
  "favoriteMovie/getlistmovie",
  async (id: string) => {
    const { data } = await getListFavoriteMovie(id);    
    return data;
  }
);

const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(addmovie.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getlistmovie.pending, (state, action) => {
      
    });
    builder.addCase(getlistmovie.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});


export default favoriteMovieSlice.reducer;
