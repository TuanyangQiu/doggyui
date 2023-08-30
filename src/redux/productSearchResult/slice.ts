import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchResultState {
    loading: boolean,
    requestError: string | null;
    data: any,
    pagination: any

}

const initialState: ProductSearchResultState = {

    loading: true,
    requestError: null,
    data: null,
    pagination: null
}

export const searchProductAsync = createAsyncThunk(

    "productSearchResult/searchProductAsync",
    async (params: {
        keyword: string,
        pageNum: number,
        pageSize: number
    }) => {
        let url = `http://localhost:5022/TouristRoutes?pageNumber=${params.pageNum}&pageSize=${params.pageSize}`;
        if (params.keyword)
            url += `&keyword=${params.keyword}`;
        const response = await axios.get(url);
        console.log("search page is ",  response.headers);
        return {
            productSearchResults: response.data,
            pagination:  JSON.parse(response.headers["x-pagination"])
            // pagination:  JSON.parse(`{"PreviousPageUrl":"abc","NextPageUrl":"http://localhost:5022/TouristRoutes?PageNumber=2&PageSize=8&Keyword=e&Rating=0","PageInfo":{"TotalRecordCounts":19,"CurrentPageNum":1,"PageSize":8,"TotalPageCounts":3,"HasPreviousPage":false,"HasNextPage":true}}`)
        };
    }

);

export const productSearchResultSlice = createSlice({
    name: "productSearchResult",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProductAsync.pending.type]: (state) => {

            state.loading = true;
            state.requestError = null;
            state.data = null;
        },
        [searchProductAsync.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.requestError = null;
            state.data = action.payload.productSearchResults;
            state.pagination = action.payload.pagination;
        },
        [searchProductAsync.rejected.type]: (state, action) => {
            state.loading = false;
            // state.requestError = action.payload.error;
            //state.data = null;
        }


    }

});