import { createStore, applyMiddleware } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSearchResultSlice } from "./productSearchResult/slice";
import { UserSignInSlice } from "./userSignIn/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//after used redux-toolkit, the combineReducer should come from redux toolkit instead of redux
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetailReducer: productDetailSlice.reducer,
    productSearchResultReducer: productSearchResultSlice.reducer,
    userSignInReducer: UserSignInSlice.reducer
});

const persistConfig = {
    key: "root",
    storage,//this is local storage
    whitelist: ["userSignInReducer"] //only store UserSignIn data in local storage 
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    // reducer: rootReducer,   use persistReducer to achieve data persist
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(actionLog),
    devTools: true
});
const pstStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default { store, pstStore };

