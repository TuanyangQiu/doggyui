import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers } from '@reduxjs/toolkit';

//after used redux-toolkit, the combineReducer should come from redux toolkit instead of redux
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetailReducer: productDetailSlice.reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;
