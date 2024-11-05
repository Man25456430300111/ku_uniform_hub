import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Category from './pages/category';
import Cart from './pages/cart';
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
          path='/category'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Category />
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
        
      </Routes>
    </Router>
  );
}

export default App;
