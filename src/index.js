import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from "./context/DataContext";
import { AuthContextProvider } from "./context/AuthContext";

//strict mode only used forr development to pick up errors
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <DataProvider>
          <App />
      </DataProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
