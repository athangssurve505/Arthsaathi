import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  console.log(accessToken)
  // User is not authenticated
  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  // User is authenticated
  return <Outlet />;
};

export default ProtectedRoute;