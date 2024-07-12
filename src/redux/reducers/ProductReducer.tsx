
import { createSlice } from '@reduxjs/toolkit';
import { IProducts } from '../../interfaces';
import { listProduct } from '../actions/actions';




const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        product: null as IProducts | null,
        error: null as string | null,
        loading: false as boolean
    },
    reducers: {
        makeErrorDisable: (state) => {
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(listProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.data as IProducts;
                state.error = null
            })
            .addCase(listProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listProduct.rejected, (state, action) => {
                state.product = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            

    }
},
);

export const { makeErrorDisable } = ProductSlice.actions;
export default ProductSlice.reducer;
