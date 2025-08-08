import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardRoutes from "./DashboardRoutes";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./routeConstants";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Protected Dashboard Routes */}
      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute>
            <DashboardRoutes />
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
