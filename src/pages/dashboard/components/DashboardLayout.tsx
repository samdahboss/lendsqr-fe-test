import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { SidebarProvider } from "@/context/SidebarContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className='dashboard-layout'>
        <DashboardHeader />
        <div className='dashboard-body'>
          <DashboardSidebar />
          <main className='dashboard-content'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
