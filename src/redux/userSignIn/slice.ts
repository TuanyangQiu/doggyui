import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

interface UserSignInState {

    loading: boolean,
    requestError: string | null,
    jwtToken: string | null
}

const initialState: UserSignInState = {
    loading: false,
    requestError: null,
    jwtToken: null
}

export const UserSignInRequestAsync = createAsyncThunk(
    "UserSignIn/UserSignInRequestAsync",
    async (params: { userName: string, password: string }, thunkApi) => {
        try {
            const { data } = await axios.post("http://localhost:5022/auth/login", {
                email: params.userName,
                password: params.password
            });
            return data;
        } catch (error) {
            return error;
        }

    })

export const UserSignInSlice = createSlice({
    name: "UserSignIn",
    initialState: initialState,
    reducers: {
        SignOut: (state) => {
            state.loading = false;
            state.jwtToken = null;
            state.requestError = null;
        }
    },
    extraReducers: {
        [UserSignInRequestAsync.pending.type]: (state) => {
            state.loading = true;
            state.jwtToken = null;
            state.requestError = null;
        },
        [UserSignInRequestAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.jwtToken = action.payload;
            state.requestError = null;
        },
        [UserSignInRequestAsync.rejected.type]: (state, action) => {
            state.loading = false;
            state.jwtToken = null;
            state.requestError = action.payload;
        }
    }
});