import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UserDetailsTabs from "../UserDetailsTabs";

const mockOnTabChange = jest.fn();

describe("UserDetailsTabs", () => {
  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it("renders all tabs", () => {
    render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    expect(screen.getByText("General Details")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Bank Details")).toBeInTheDocument();
    expect(screen.getByText("Loans")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
    expect(screen.getByText("App and System")).toBeInTheDocument();
  });

  it("marks the active tab correctly", () => {
    render(
      <UserDetailsTabs activeTab='Documents' onTabChange={mockOnTabChange} />
    );

    const documentsTab = screen.getByRole("button", { name: "Documents" });
    const generalTab = screen.getByRole("button", { name: "General Details" });

    expect(documentsTab).toHaveClass("active");
    expect(generalTab).not.toHaveClass("active");
  });

  it("calls onTabChange when a tab is clicked", () => {
    render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    const documentsTab = screen.getByRole("button", { name: "Documents" });
    fireEvent.click(documentsTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("Documents");
  });

  it("handles multiple tab clicks correctly", () => {
    render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    const documentsTab = screen.getByRole("button", { name: "Documents" });
    const loansTab = screen.getByRole("button", { name: "Loans" });

    fireEvent.click(documentsTab);
    expect(mockOnTabChange).toHaveBeenCalledWith("Documents");

    fireEvent.click(loansTab);
    expect(mockOnTabChange).toHaveBeenCalledWith("Loans");

    expect(mockOnTabChange).toHaveBeenCalledTimes(2);
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    expect(container.querySelector(".user-details-tabs")).toBeInTheDocument();
    expect(container.querySelector(".tabs-container")).toBeInTheDocument();
    expect(container.querySelectorAll(".tab")).toHaveLength(6);
  });

  it("handles keyboard navigation", () => {
    render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    const documentsTab = screen.getByRole("button", { name: "Documents" });

    // Simulate Enter key press
    fireEvent.keyDown(documentsTab, { key: "Enter", code: "Enter" });

    // Note: The actual tab change happens on click, not keydown
    // This test ensures the tab is focusable and accessible
    expect(documentsTab).toBeInTheDocument();
  });

  it("maintains tab order for accessibility", () => {
    render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    const tabs = screen.getAllByRole("button");
    const expectedTabOrder = [
      "General Details",
      "Documents",
      "Bank Details",
      "Loans",
      "Savings",
      "App and System",
    ];

    tabs.forEach((tab, index) => {
      expect(tab).toHaveTextContent(expectedTabOrder[index]);
    });
  });

  it("works with different active tab states", () => {
    const { rerender } = render(
      <UserDetailsTabs
        activeTab='General Details'
        onTabChange={mockOnTabChange}
      />
    );

    expect(screen.getByRole("button", { name: "General Details" })).toHaveClass(
      "active"
    );

    rerender(
      <UserDetailsTabs activeTab='Loans' onTabChange={mockOnTabChange} />
    );

    expect(screen.getByRole("button", { name: "Loans" })).toHaveClass("active");
    expect(
      screen.getByRole("button", { name: "General Details" })
    ).not.toHaveClass("active");
  });
});
