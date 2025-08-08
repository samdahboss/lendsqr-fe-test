import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";

// Mock the sidebar context and components
jest.mock("@/context/SidebarContext", () => ({
  SidebarProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='sidebar-provider'>{children}</div>
  ),
}));

jest.mock("../DashboardHeader", () => {
  return function MockDashboardHeader() {
    return <header data-testid='dashboard-header'>Header</header>;
  };
});

jest.mock("../DashboardSidebar", () => {
  return function MockDashboardSidebar() {
    return <aside data-testid='dashboard-sidebar'>Sidebar</aside>;
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("DashboardLayout", () => {
  it("renders children inside layout", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardLayout>
        <div data-testid='child'>Child</div>
      </DashboardLayout>
    );

    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("renders dashboard layout structure", () => {
    const { getByTestId } = renderWithRouter(
      <DashboardLayout>
        <div data-testid='child'>Child</div>
      </DashboardLayout>
    );

    expect(getByTestId("sidebar-provider")).toBeInTheDocument();
    expect(getByTestId("dashboard-header")).toBeInTheDocument();
    expect(getByTestId("dashboard-sidebar")).toBeInTheDocument();
  });

  it("renders children in main content area", () => {
    const { container, getByTestId } = renderWithRouter(
      <DashboardLayout>
        <div data-testid='child'>Child Content</div>
      </DashboardLayout>
    );

    const mainElement = container.querySelector("main.dashboard-content");
    expect(mainElement).toBeInTheDocument();
    expect(getByTestId("child")).toBeInTheDocument();
  });
});
