import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchResultsPage, ShoppingCartPage, PlaceOrder } from './pages';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useSelector, useAppDispatch } from "./redux/hooks";
import { GetShoppingCartItemsAsync } from "./redux/shoppingCart/slice";


axios.defaults.headers["Accept"] = "application/json";


const PrivateRoute = ({ children }) => {
  const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);
  //if the user has not yet signed in, should navigate to the sign in page
  return jwtToken ? children : <Navigate to="/signin" />
}




function App() {
  const dispatch = useAppDispatch();
  const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);


  useEffect(() => {
    //preload the shopping cart information
    if (jwtToken)
      dispatch(GetShoppingCartItemsAsync({ jwtToken: jwtToken }));
  }, [jwtToken]);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/signin" element={<SignInPage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/detail/:touristRouteId" element={<DetailPage />} > </Route>
          <Route path="/search/:keyword?" element={<SearchResultsPage />}></Route>
          <Route path="/shoppingCart" element={
            <PrivateRoute>
              <ShoppingCartPage />
            </PrivateRoute>} >
          </Route>



          <Route path="*" element={<h2>404 Page Not Found: Oops, it seems the page has gone on a coffee break </h2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
