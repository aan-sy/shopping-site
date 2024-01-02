import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRouter({ children, requireAdmin }) {
  const { user } = useAuthContext();

  if(!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />
  }

  return children;
}