import { useState, ReactNode } from "react";
import { SidebarContext } from "./SidebarContext.constants";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
