import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const FacultyRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isFaculty ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
export default FacultyRoute;
