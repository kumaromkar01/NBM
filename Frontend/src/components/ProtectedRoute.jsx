import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProtectedRoute({children}) {
    const {isAuthenticated, loading,user} = useAuth();

    if(loading) return <div className='m-auto w-full h-full rounded-full border-2 border-yellow-400 animate-bounce'></div>
    if(!user) {
        toast.error('Please login to visit Protected Routes');
        return <Navigate to='/' replace/>
    }
  return (
    children
  )
}

export default ProtectedRoute
