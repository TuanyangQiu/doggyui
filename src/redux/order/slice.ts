import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface OrderState {
    loading: boolean,
    requestError: string | null,
    items: any
}

const initialState: OrderState = {
    loading: false,
    requestError: null,
    items: null
}

export const GetPendingOrdersAsync = createAsyncThunk(
    "orders/GetPendingOrdersAsync",
    async (jwtToken: string, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("http://localhost:5022/orders",
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

export const ordersSlice = createSlice({

    name: "orders",
    initialState,
    reducers: {
        payMoney: (state) => {
            state.items.orderStatus = "Completed";
            //This is a mock functin to simulate successed payment 

        }
    },
    extraReducers: {
        [GetPendingOrdersAsync.pending.type]: (state) => {
            state.loading = true;
            state.requestError = null;
            state.items = null;
        }, [GetPendingOrdersAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.requestError = null;
            state.items = action.payload;

        }, [GetPendingOrdersAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.requestError = action.payload;
            //state.items = [];
        }
    }
});
