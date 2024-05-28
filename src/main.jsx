import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';

import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios'

// axios.defaults.baseURL="http://localhost:3001/"
axios.defaults.baseURL="https://optimeotechback-production.up.railway.app/"
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <GoogleOAuthProvider clientId="590293034374-7gsaalpm0nkk7ru12mggnvdi7ji779o9.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>;
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)