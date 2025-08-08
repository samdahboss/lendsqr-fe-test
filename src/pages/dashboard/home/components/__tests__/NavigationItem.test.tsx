import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "lucide-react";
import NavigationItemComponent from "../NavigationItem";
import { NavigationItem } from "@/constants/navigation";

// Mock the sidebar utils
jest.mock("@/utils/sidebarUtils", () => ({
  getNavLinkClasses: (isActive: boolean) =>
    `nav-link ${isActive ? "active" : ""}`,
  SIDEBAR_CLASSES: {
    NAV_ICON: "nav-icon",
    NAV_TEXT: "nav-text",
    NAV_DROPDOWN_ICON: "nav-dropdown-icon",
  },
}));

const mockItem: NavigationItem = {
  name: "Dashboard",
  icon: Home,
  path: "/dashboard",
  hasDropdown: false,
};

const mockItemWithDropdown: NavigationItem = {
  name: "Switch Organization",
  icon: Home,
  path: "#",
  hasDropdown: true,
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NavigationItemComponent", () => {
  const mockOnItemClick = jest.fn();

  beforeEach(() => {
    mockOnItemClick.mockClear();
  });

  it("renders navigation item with text and icon", () => {
    renderWithRouter(
      <NavigationItemComponent
        item={mockItem}
        isActive={false}
        onItemClick={mockOnItemClick}
      />
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders as link when hasDropdown is false", () => {
    renderWithRouter(
      <NavigationItemComponent
        item={mockItem}
        isActive={false}
        onItemClick={mockOnItemClick}
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders as span when hasDropdown is true", () => {
    renderWithRouter(
      <NavigationItemComponent
        item={mockItemWithDropdown}
        isActive={false}
        onItemClick={mockOnItemClick}
      />
    );

    expect(screen.getByText("Switch Organization")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies active class when isActive is true", () => {
    renderWithRouter(
      <NavigationItemComponent
        item={mockItem}
        isActive={true}
        onItemClick={mockOnItemClick}
      />
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass("active");
  });
});
