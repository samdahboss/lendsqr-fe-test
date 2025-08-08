/**
 * Sidebar utility functions and constants
 */

export const SIDEBAR_CONFIG = {
  WIDTH: 283,
  MOBILE_BREAKPOINT: 768,
  LOGO_HEIGHT: 30,
  VERSION: "v1.2.0",
} as const;

export const SIDEBAR_CLASSES = {
  SIDEBAR: "dashboard-sidebar",
  MOBILE_OPEN: "mobile-open",
  MOBILE_TOGGLE: "sidebar-mobile-toggle",
  MOBILE_OVERLAY: "sidebar-mobile-overlay",
  LOGO: "sidebar-logo",
  NAV: "sidebar-nav",
  NAV_SECTION: "nav-section",
  NAV_SECTION_TITLE: "nav-section-title",
  NAV_LIST: "nav-list",
  NAV_ITEM: "nav-item",
  NAV_LINK: "nav-link",
  NAV_LINK_ACTIVE: "active",
  NAV_ICON: "nav-icon",
  NAV_TEXT: "nav-text",
  NAV_DROPDOWN_ICON: "nav-dropdown-icon",
  FOOTER: "sidebar-footer",
  LOGOUT_BTN: "logout-btn",
  VERSION: "sidebar-version",
} as const;

/**
 * Helper function to generate sidebar classes
 */
export function getSidebarClasses(isMobileOpen: boolean): string {
  return `${SIDEBAR_CLASSES.SIDEBAR} ${
    isMobileOpen ? SIDEBAR_CLASSES.MOBILE_OPEN : ""
  }`;
}

/**
 * Helper function to generate nav link classes
 */
export function getNavLinkClasses(isActive: boolean): string {
  return `${SIDEBAR_CLASSES.NAV_LINK} ${
    isActive ? SIDEBAR_CLASSES.NAV_LINK_ACTIVE : ""
  }`;
}
