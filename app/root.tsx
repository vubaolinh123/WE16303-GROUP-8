import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice";
import userSlice from "../features/user/user.slice";
import authReducer from "../features/auth/auth.slice";


const rootReducer = combineReducers({
    product: productReducer,
    user: userSlice
    auth: authReducer
});

export default rootReducer;