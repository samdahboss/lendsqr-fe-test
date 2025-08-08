import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import UserDetails from "../pages/users/UserDetails";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routeConstants";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Protected Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.USERS}
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.USER_DETAILS}
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path='/' element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Catch all route - 404 */}
      <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
