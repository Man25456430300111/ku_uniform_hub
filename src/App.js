import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Category from './pages/category';
import Product_page from './pages/product_page';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import SignIn from './pages/login';
import './App.css'; 



function App() {
  return (
    <Router>
      
        <Routes>
          <Route path='/' element={<SignIn />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path="/home" element={<Home />} />
          <Route path='/category' element={<Category />}/>
          <Route path='/product_page' element={<Product_page />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout' element={<Checkout />}/>
        </Routes>
    </Router>
  );
}

export default App;
