import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { ProductProvider } from './services/ProductContext.jsx'
import { CartProvider } from './services/CartContext.jsx'
import { AuthProvider } from './services/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CartProvider>
      </ProductProvider >
    </AuthProvider>
  </BrowserRouter>
)
