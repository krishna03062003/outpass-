import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';

export default function AdminPrivateRoute({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/check-auth", { withCredentials: true })
      .then((res) => {
        setAdmin(res.data.admin); // Expecting { admin: { name: 'mehak', ... } }
      })
      .catch(() => setAdmin(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" />;

  // Clone the child element and inject admin prop
  return typeof children === 'object' && children !== null
    ? { ...children, props: { ...children.props, admin } }
    : children;
}
