import { FetchRecommendProductsActionTypes, FETCH_RECOMMEND_PRODUCTS_FAIL, FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_PRODUCTS_SUCCESS } from './recommendProductsActions';

interface RecommendProductsState {

    ProductsList: any[],
    loading: boolean,
    requestError: null | string
}

const defaultRecommendProudctsState: RecommendProductsState = {
    ProductsList: [],
    loading: true,
    requestError: null
}

export default (state = defaultRecommendProudctsState, action: FetchRecommendProductsActionTypes) => {

    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, ProductsList: action.payload, requestError: null }
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return { ...state, loading: false, requestError: action.payload }
        default:
            return state;
    }


}