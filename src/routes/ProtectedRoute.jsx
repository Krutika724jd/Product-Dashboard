import React from 'react'
import { isAuthenticated } from '../utils/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  console.log(isAuthenticated)
    if(!isAuthenticated()){
      console.log(18)
      return <Navigate  to='/'/>
    }
  return children;
}

export default ProtectedRoute