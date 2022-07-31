import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IProductState {
    value: any[];
}

const initialState: IProductState = {
    value: [
        { id: 1, name: "Product A" },
        { id: 2, name: "Product B" },
        { id: 3, name: "Product C" },
    ],
};

// Action
export const getProducts = createAsyncThunk("product/getProduct", async () => {
    const data = await (await fetch(`https://6110f09bc38a0900171f0ed0.mockapi.io/products`)).json();
    return data;
});
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export default productSlice.reducer;
