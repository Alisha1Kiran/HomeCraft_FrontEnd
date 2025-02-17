import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ element }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user?.role === "admin" ? element : <Navigate to="/" />;
};

export default AdminProtectedRoute;
