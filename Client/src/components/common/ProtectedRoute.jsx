import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, user } = useAuth();
  if(!token || !user) return <Navigate to="/login" />;
  if(allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />
  }
  return <Outlet />;
};

export default ProtectedRoute;
