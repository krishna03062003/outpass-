import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';

export default function StudentPrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    api.get("/auth/check-auth", { withCredentials: true }) // Make sure to implement this API in your backend
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // While loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // If authenticated, render the child components, else redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
}
