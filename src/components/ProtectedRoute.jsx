import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);

  if (!user) {
    return <Navigate to='/register' />;
  }
  return children;
};

export default ProtectedRoute;
