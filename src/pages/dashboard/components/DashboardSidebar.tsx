import { LogOut, Menu } from "lucide-react";
import { NAVIGATION_SECTIONS } from "../../../constants/navigation";
import { useSidebarLogic } from "../../../hooks/useSidebarLogic";
import NavigationItemComponent from "./NavigationItem";
import {
  getSidebarClasses,
  SIDEBAR_CLASSES,
  SIDEBAR_CONFIG,
} from "../../../utils/sidebarUtils";
import { SidebarProvider } from "../../../context/SidebarContext";

export default function DashboardSidebar() {
  return (
    <SidebarProvider>
      <DashboardSidebarContent />
    </SidebarProvider>
  );
}

function DashboardSidebarContent() {
  const { isMobileMenuOpen, isActiveRoute, toggleMobileMenu, closeMobileMenu } =
    useSidebarLogic();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={SIDEBAR_CLASSES.MOBILE_TOGGLE}
        onClick={toggleMobileMenu}
        aria-label='Toggle navigation menu'
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside className={getSidebarClasses(isMobileMenuOpen)}>
        {/* Logo */}
        <div className={SIDEBAR_CLASSES.LOGO}>
          <img src='/lendsqr-logo.svg' alt='Lendsqr' />
        </div>

        {/* Navigation */}
        <nav className={SIDEBAR_CLASSES.NAV}>
          {NAVIGATION_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex} className={SIDEBAR_CLASSES.NAV_SECTION}>
              {section.title && (
                <h3 className={SIDEBAR_CLASSES.NAV_SECTION_TITLE}>
                  {section.title}
                </h3>
              )}
              <ul className={SIDEBAR_CLASSES.NAV_LIST}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={SIDEBAR_CLASSES.NAV_ITEM}>
                    <NavigationItemComponent
                      item={item}
                      isActive={isActiveRoute(item.path)}
                      onItemClick={closeMobileMenu}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className={SIDEBAR_CLASSES.FOOTER}>
          <button
            className={`${SIDEBAR_CLASSES.NAV_LINK} ${SIDEBAR_CLASSES.LOGOUT_BTN}`}
            onClick={closeMobileMenu}
          >
            <LogOut className={SIDEBAR_CLASSES.NAV_ICON} size={16} />
            <span className={SIDEBAR_CLASSES.NAV_TEXT}>Logout</span>
          </button>
          <div className={SIDEBAR_CLASSES.VERSION}>
            {SIDEBAR_CONFIG.VERSION}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className={SIDEBAR_CLASSES.MOBILE_OVERLAY}
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
}
