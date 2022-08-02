import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice";
import authReducer from "../features/auth/auth.slice";


const rootReducer = combineReducers({
    product: productReducer,
    auth: authReducer
});

export default rootReducer;