import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL";

interface FetchRecommendProductsStart {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccess {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFail {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}


export type FetchRecommendProductsActionTypes = FetchRecommendProductsStart | FetchRecommendProductsSuccess | FetchRecommendProductsFail;


const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStart => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    };
}

const fetchRecommendProductsSuccessActionCreator = (data: any): FetchRecommendProductsSuccess => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    };
}

const fetchRecommendProductsFailActionCreator = (error: any): FetchRecommendProductsFail => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    };
}




export const FetchRecommendProductsActionCreator =
    (): ThunkAction<void, RootState, unknown, FetchRecommendProductsActionTypes> =>
        async (dispath, getState) => {
            try {
                dispath(fetchRecommendProductsStartActionCreator());
                const resp = await axios.get("http://127.0.0.1:5022/TouristRoutes?pageNumber=1&pageSize=9");

                const tempProd = (resp.data as any[]).map((m, index) => {
                    return {
                        id: m.Id,
                        title: m.Title,
                        touristRoutePictures: [{ url: "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg" }],
                        price: m.Price
                    }
                });
                dispath(fetchRecommendProductsSuccessActionCreator(tempProd));

            } catch (error) {
                dispath(fetchRecommendProductsFailActionCreator(error));
            }
        }