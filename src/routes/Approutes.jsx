import React from 'react'
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import MainLayout from "../layouts/MainLayout";
import { Routes,Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';

const Approutes = () => {
  return (
    <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login/>}></Route>
        {/* Protected Layout Routes (we secure later) */}
        
        <Route path="/dashboard" element={
           <ProtectedRoute>
             <MainLayout />
            </ProtectedRoute>}>
          {/* Child Routes */}
         <Route index element={<Dashboard />} />
         <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}

export default Approutes