import React from "react";
import { useUser } from "../utils/UserContext";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoute;
