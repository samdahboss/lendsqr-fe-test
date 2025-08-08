import { createContext } from "react";

export interface SidebarContextProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);
