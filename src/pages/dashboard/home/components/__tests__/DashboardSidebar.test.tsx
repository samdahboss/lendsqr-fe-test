import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardSidebar from "../DashboardSidebar";

// Mock the hooks and utilities
jest.mock("@/hooks/useSidebarLogic", () => ({
  useSidebarLogic: () => ({
    isMobileMenuOpen: false,
    isActiveRoute: jest.fn(() => false),
    closeMobileMenu: jest.fn(),
  }),
}));

jest.mock("@/utils/sidebarUtils", () => ({
  getSidebarClasses: (isMobileOpen: boolean) =>
    `dashboard-sidebar ${isMobileOpen ? "mobile-open" : ""}`,
  SIDEBAR_CLASSES: {
    NAV: "sidebar-nav",
    NAV_SECTION: "nav-section",
    NAV_SECTION_TITLE: "nav-section-title",
    NAV_LIST: "nav-list",
    NAV_ITEM: "nav-item",
    NAV_LINK: "nav-link",
    NAV_ICON: "nav-icon",
    NAV_TEXT: "nav-text",
    FOOTER: "sidebar-footer",
    LOGOUT_BTN: "logout-btn",
    VERSION: "sidebar-version",
  },
  SIDEBAR_CONFIG: {
    VERSION: "v1.2.0",
  },
}));

// Mock the NavigationItem component
jest.mock("../NavigationItem", () => {
  return function MockNavigationItem({ item }: { item: { name: string } }) {
    return <div data-testid={`nav-item-${item.name}`}>{item.name}</div>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("DashboardSidebar", () => {
  it("renders sidebar navigation", () => {
    renderWithRouter(<DashboardSidebar />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("sidebar-nav");
  });

  it("renders navigation items", () => {
    renderWithRouter(<DashboardSidebar />);

    // Check for some expected navigation items
    expect(screen.getByTestId("nav-item-Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("nav-item-Users")).toBeInTheDocument();
  });

  it("renders logout button", () => {
    renderWithRouter(<DashboardSidebar />);

    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders sidebar version", () => {
    renderWithRouter(<DashboardSidebar />);

    const version = screen.getByText("v1.2.0");
    expect(version).toBeInTheDocument();
  });
});
