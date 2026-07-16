import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import Loading from "../Components/Common/Loading.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) return <Navigate to={"/login"} />;

  return children;
}
export default ProtectedRoute;
