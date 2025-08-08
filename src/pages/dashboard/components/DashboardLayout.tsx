import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className='dashboard-layout'>
      <DashboardSidebar />
      <div className='dashboard-main'>
        <DashboardHeader />
        <main className='dashboard-content'>{children}</main>
      </div>
    </div>
  );
}
