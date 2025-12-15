import React from 'react'
import Home from './pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Cart from './pages/cart/Cart'
import Product from './pages/products/Product'
// import About from './pages/about/About'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Product />} />
        {/* <Route path='/about' element={<About />} /> */}
      </Routes>
    </div>
  )
}
