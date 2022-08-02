import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice";
import userSlice from "../features/user/user.slice";


const rootReducer = combineReducers({
    product: productReducer,
    user: userSlice
});

export default rootReducer;