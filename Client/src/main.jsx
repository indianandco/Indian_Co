import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { SearchProvider } from './services/SearchContext.jsx'
import { ProductProvider } from './services/ProductContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SearchProvider>
    <ProductProvider>  
      <React.StrictMode>
        <App />
      </React.StrictMode>
      </ProductProvider >
    </SearchProvider>
  </BrowserRouter>
)
