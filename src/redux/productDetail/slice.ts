import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
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
export const productDetailSlice = createSlice(
    {
        name: "productDetail",
        initialState,
        reducers: {
            fetchStart: (state) => {
                //DO NOT need to use this way because redux toolkit has built-in Immer
                // return {...state,loading:true};
                state.loading = true;
                state.requestError = null;
                state.data = null;
            },
            fetchSuccess: (state, action) => {
                state.loading = false;
                state.requestError = null;
                state.data = action.payload;
            },
            fetchFail: (state, action: PayloadAction<string | null>) => {
                state.loading = false;
                state.requestError = action.payload;
                state.data = null;
            }
        }
    });