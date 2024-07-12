
import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../interfaces';
import { listCart } from '../actions/actions';




const CartSlice = createSlice({
    name: 'product',
    initialState: {
        data: null as ICart | null,
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
            .addCase(listCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data as ICart;
                state.error = null
            })
            .addCase(listCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listCart.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.payload as string;
            })
            

    }
},
);

export const { makeErrorDisable } = CartSlice.actions;
export default CartSlice.reducer;
