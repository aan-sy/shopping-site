import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function ProtectedRouter({ children, requireAdmin }) {
  const { user } = useAuth();

  if(!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />
  }

  return children;
}