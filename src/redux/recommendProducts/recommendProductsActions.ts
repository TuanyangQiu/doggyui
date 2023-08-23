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


export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStart => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    };
}

export const fetchRecommendProductsSuccessActionCreator = (data: any): FetchRecommendProductsSuccess => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    };
}

export const fetchRecommendProductsFailActionCreator = (error: any): FetchRecommendProductsFail => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    };
}


