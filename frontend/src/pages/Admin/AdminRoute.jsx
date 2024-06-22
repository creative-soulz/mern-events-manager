import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    // return !userInfo  ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
export default AdminRoute;
