import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../features/products/products.slice";
import userReducer from "../features/user/user.slice";


const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer
});

export default rootReducer;