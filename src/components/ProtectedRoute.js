import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
