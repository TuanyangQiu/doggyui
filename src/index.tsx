import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css';
import './i18n/configs';
import { Provider } from 'react-redux'
import rootStore from './redux/store'
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.pstStore}>
        <App />
      </PersistGate>

    </Provider>
  </React.StrictMode>

);

