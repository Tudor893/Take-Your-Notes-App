import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='your clientID'>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
