import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('userToken');

    if (!token) {
      navigate('/'); // Redirect to the login page if the token is missing
      return;
    }

    try {
      const decodedToken = jwt_decode(token);
  
      // Check if the user's role is allowed to access this page
      if (!allowedRoles.includes(decodedToken.role)) {
        navigate('/unauthorized'); // Redirect to an unauthorized page
      } else {
        setUserRole(decodedToken.role);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/'); // Redirect to the login page if the token is invalid
    }
  }, [navigate, allowedRoles, userRole]); // Include userRole in the dependency array

  return <>{children}</>;
};

export default ProtectedRoute;
