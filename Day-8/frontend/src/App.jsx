/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false, name: "Guest" });
  const checkIsUserLoggedIn=async()=>{
         
  }
  useEffect(()=>{
    checkIsUserLoggedIn();
  },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user.isLoggedIn ? <Home /> : <Navigate to="/signup" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
