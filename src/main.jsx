import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalStyles } from './global-styles';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from "./context/Context.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext.Provider>
      <GlobalStyles />
      <App />
    </AppContext.Provider>
  </React.StrictMode>,
)
