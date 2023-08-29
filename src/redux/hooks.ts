import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "./store";


export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

//using react-redux dispatch to dispatch the action created by createAsyncThunk will get the below error
//Argument of type 'AsyncThunkAction<void, string, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'.
//so, the solution is to create a new dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();