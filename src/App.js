// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './pages/home';
// import Login from './pages/login';
// import Signup from './pages/signup';
// import Category from './pages/category';
// import Product_page from './pages/product_page';
// import Cart from './pages/cart';
// import Checkout from './pages/checkout';
// import SignIn from './pages/login';
// import './App.css'; 



// function App() {
//   return (
//     <Router>
      
//         <Routes>
//           <Route path='/' element={<SignIn />}/>
//           <Route path='/signup' element={<Signup />}/>
//           <Route path="/home" element={<Home />} />
//           <Route path='/category' element={<Category />}/>
//           <Route path='/product_page' element={<Product_page />}/>
//           <Route path='/cart' element={<Cart />}/>
//           <Route path='/checkout' element={<Checkout />}/>
//         </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Category from './pages/category';
import Product_page from './pages/product_page';
import Cart from './pages/cart';
import AddProducts from './pages/addproducts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading indicator while checking authentication
  }

  // If the user is not authenticated, navigate to the login page
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User status:', user); // ตรวจสอบสถานะของผู้ใช้
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/category'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path='/product_page'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Product_page />
            </ProtectedRoute>
          }
        />
        <Route
          path='/cart'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/addproducts'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

