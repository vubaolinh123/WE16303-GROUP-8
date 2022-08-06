import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice";
import userSlice from "../features/user/user.slice";
import authReducer from "../features/auth/auth.slice";
import favoriteMovieReducer from "../features/favoriteMovie/favoritemovie.slice"

const rootReducer = combineReducers({
    product: productReducer,
    user: userSlice,
    auth: authReducer,
    favoriteMovie: favoriteMovieReducer
});

export default rootReducer;