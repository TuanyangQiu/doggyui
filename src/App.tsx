import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchResultsPage } from './pages';
import axios from 'axios';
import { ShoppingCartPage } from "./pages/shoppingCart";
import { Navigate } from "react-router-dom";
import { useSelector } from "./redux/hooks";
axios.defaults.headers["Accept"] = "application/json";


const PrivateRoute = ({ children }) => {
  const jwtToken = useSelector(state => state.userSignInReducer.jwtToken);
  //if the user has not yet signed in, should navigate to the sign in page
  return jwtToken ? children : <Navigate to="/signin" />
}


function App() {
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
