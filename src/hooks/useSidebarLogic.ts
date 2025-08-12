import { useLocation } from "react-router-dom";
import { useSidebar } from "../context/useSidebar";

export function useSidebarLogic() {
  const location = useLocation();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useSidebar();

  const isActiveRoute = (path: string): boolean => {
    if (path === "#") return false;
    // Active if current path matches or starts with the sidebar path
    if (location.pathname === path) return true;
    // Special case: users link should be active for user details subroutes
    if (
      path === "/dashboard/users" &&
      location.pathname.startsWith("/dashboard/users")
    ) {
      return true;
    }
    return false;
  };

  return {
    isMobileMenuOpen,
    isActiveRoute,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
