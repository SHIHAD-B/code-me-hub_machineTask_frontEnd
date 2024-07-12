import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../../config/configuration";
import { reduxRequest } from "../../config/api";



export const listCart: any = createAsyncThunk("api/displaycart", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "api/displaycart",
        config,
        rejectWithValue,

    )

})
export const listProduct: any = createAsyncThunk("api/displayproduct", async (_, { rejectWithValue }) => {
    return reduxRequest(
        "get",
        "api/displayproduct",
        config,
        rejectWithValue,

    )

})


