import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login.page";
import Register from "./Pages/Register.page";
import Dashboard from "./Pages/Dashboard.page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userSlice } from "../State/sagas/user.saga";
import type { RootState } from "../State/store";

export const AppRoutes = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Retrieve is failing due to permissions issues? Will continue with state only for now...
  useEffect(() => {
    if (!user?.data && !user?.error) {
      dispatch(userSlice.actions.retrieve());
    }
  }, [user, dispatch]);

  const UnauthenticatedRoutes = () => (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Default redirect - Could be a 404 page */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );

  const AuthenticatedRoutes = () => (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      {/* Default redirect - Could be a 404 page */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );

  if (user.data) {
    return <AuthenticatedRoutes />;
  }
  return <UnauthenticatedRoutes />;
};
