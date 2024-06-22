import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const FacultyRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isStdRep ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
export default FacultyRoute;
