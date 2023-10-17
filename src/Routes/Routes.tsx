import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { userSlice } from "../State/sagas/user.saga";
import type { RootState } from "../State/store";
import { Loader } from "../components/Loader";

export const AppRoutes = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Try and get User data to see if user is logged in
  useEffect(() => {
    if (!user?.data && !user?.error) {
      dispatch(userSlice.actions.retrieve());
    }
  }, [user, dispatch]);

  // While working, show loading screen
  if (user.status === "LOADING") {
    return <Loader />;
  }

  if (!user.data) {
    // Unauthenticated
    const Login = lazy(() => import("./Authentication/Login.page"));
    const Register = lazy(() => import("./Authentication/Register.page"));

    return (
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Default redirect - Could be a 404 page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    );
  } else {
    let Layout;
    let Dashboard;

    if (user?.data?.staff) {
      Layout = lazy(() => import("./StaffRoutes/StaffLayout"));
      Dashboard = lazy(() => import("./StaffRoutes/Dashboard"));
    } else {
      Layout = lazy(() => import("./ParentRoutes/ParentLayout"));
      Dashboard = lazy(() => import("./ParentRoutes/Dashboard"));
    }

    return (
      <Suspense fallback={<Loader />}>
        <Layout username={user?.data?.firstName}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* Default redirect - Could be a 404 page */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </Suspense>
    );
  }
};
