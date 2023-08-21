import React from 'react';
import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages';
import axios from 'axios';

axios.defaults.headers["Accept"] = "application/json";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} ></Route>
          <Route path="/signin" element={<SignInPage />} ></Route>
          <Route path="/register" element={<RegisterPage />} ></Route>
          <Route path="/detail/:touristRouteId" element={<DetailPage />} > </Route>
          <Route path="*" element={<h2>404 Page Not Found: Oops, it seems the page has gone on a coffee break </h2>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
