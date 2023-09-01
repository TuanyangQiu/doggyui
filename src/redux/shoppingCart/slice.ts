import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ShoppingCartState {
    loading: boolean,
    requestError: string | null,
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: false,
    requestError: null,
    items: []
}

export const GetShoppingCartItemsAsync = createAsyncThunk(
    "shoppingCart/GetShoppingCartItemsAsync",
    async (params: { jwtToken: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://localhost:5022/shoppingCart",
                {
                    headers: {
                        Authorization: `bearer ${params.jwtToken}`
                    }
                })
            return data.lineItems;
        } catch (error) {
            return rejectWithValue(axios.isAxiosError(error) ? error.message : "unknown error!");
        }
    });

export const addShoppingCartItemAsync = createAsyncThunk(
    "shoppingCart/addShoppingCartItemAsync",
    async (params: { jwtToken: string, productId: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:5022/shoppingCart/item",
                {
                    TouristRouteId: params.productId
                },
                {
                    headers: {
                        Authorization: `bearer ${params.jwtToken}`
                    },

                })
            return data.lineItems;
        } catch (error) {
            return rejectWithValue(axios.isAxiosError(error) ? error.message : "unknown error!");
        }
    });

export const checkoutShoppingCartItemAsync = createAsyncThunk(
    "shoppingCart/checkoutShoppingCartItemAsync",
    async (jwtToken: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:5022/shoppingCart/checkout",
            null,
                {
                    headers: {
                        Authorization: `bearer ${jwtToken}`
                    }
                })
            return data;
        } catch (error) {
            return rejectWithValue(axios.isAxiosError(error) ? error.message : "unknown error!");
        }
    });


export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [GetShoppingCartItemsAsync.pending.type]: (state) => {
            state.loading = true;
            state.requestError = null;
            state.items = [];
        },
        [GetShoppingCartItemsAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.requestError = null;
            state.items = action.payload;
        },
        [GetShoppingCartItemsAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.requestError = action.payload;
            state.items = [];
        },
        [addShoppingCartItemAsync.pending.type]: (state) => {
            state.loading = true;
            state.requestError = null;
            //state.items = [];
        },
        [addShoppingCartItemAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.requestError = null;
            state.items = action.payload;
        },
        [addShoppingCartItemAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.requestError = action.payload;
            //state.items = [];
        }
        ,
        [checkoutShoppingCartItemAsync.pending.type]: (state) => {
            state.loading = true;
            state.requestError = null;
            state.items = [];
        },
        [checkoutShoppingCartItemAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.requestError = null;
            state.items = action.payload;
        },
        [checkoutShoppingCartItemAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.requestError = action.payload;
            //state.items = [];
        }

    }



})