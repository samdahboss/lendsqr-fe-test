import { useLocation } from "react-router-dom";
import { useSidebar } from "../context/useSidebar";

export function useSidebarLogic() {
  const location = useLocation();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();

  const isActiveRoute = (path: string): boolean => {
    if (path === "#") return false;
    return location.pathname === path;
  };

  return {
    isMobileMenuOpen,
    isActiveRoute,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
