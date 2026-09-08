import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth.js";
import Loading from "../Components/Common/Loading.jsx";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  // 1. Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Redirect non-admin users trying to access admin-only routes
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
