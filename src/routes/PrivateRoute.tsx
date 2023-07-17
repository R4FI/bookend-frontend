import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../redux/features/user/userSlice";
interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const isAuthenticated = !!getToken();

  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ path: pathname }} />;
  }

  return children;
}
