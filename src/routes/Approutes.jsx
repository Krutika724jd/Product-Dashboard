import React from 'react'
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import MainLayout from "../layouts/MainLayout";
import { Routes,Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Analytics from '../pages/Analytics';
import Categories from '../pages/Categories';
import Orders from '../pages/Orders';
import Settings from '../pages/Settings';

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
         <Route path="analytics" element={<Analytics />} />
         <Route path="categories" element={<Categories />} />
         <Route path="orders" element={<Orders />} />
         <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default Approutes