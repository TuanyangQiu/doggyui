import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface productDetailState {

    loading: boolean,
    requestError: string | null,
    data: any
}

const initialState: productDetailState = {

    loading: true,
    requestError: null,
    data: null
}

export const getProductDetailAsync = createAsyncThunk(
    "productDetail/getProductDetailAsync",
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(`http://localhost:5022/TouristRoutes/${touristRouteId}`);
        return data;
    });
export const productDetailSlice = createSlice(
    {
        name: "productDetail",
        initialState,
        reducers: {},
        extraReducers: {
            [getProductDetailAsync.pending.type]: (state) => {
                //DO NOT need to use this way because redux toolkit has built-in Immer
                // return {...state,loading:true};
                state.loading = true;
                state.requestError = null;
                state.data = null;
            },
            [getProductDetailAsync.fulfilled.type]: (state, action) => {
                state.loading = false;
                state.requestError = null;
                state.data = action.payload;
            },
            [getProductDetailAsync.rejected.type]: (state, action: PayloadAction<string | null>) => {
                state.loading = false;
                state.requestError = action.payload;
                state.data = null;
            }
        }
    });