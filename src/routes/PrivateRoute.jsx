import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (user) {
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // User is logged in but does not have the required role
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
    return children;
  }

  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default PrivateRoute;