import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../pages/dashboard/components/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import UserDetails from "../pages/users/UserDetails";

export default function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:id' element={<UserDetails />} />
        {/* Add more dashboard routes here as needed */}

        {/* Default redirect within dashboard */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </DashboardLayout>
  );
}
