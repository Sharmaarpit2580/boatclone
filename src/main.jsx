import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext.jsx'
import { CartProvider } from './components/cart/CartContext.jsx'
import { SearchProvider } from './components/search/SearchContext.jsx'
import { FilterProvider } from './components/filter/FilterContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <FilterProvider>
            <Router>
              <App />
            </Router>
          </FilterProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
