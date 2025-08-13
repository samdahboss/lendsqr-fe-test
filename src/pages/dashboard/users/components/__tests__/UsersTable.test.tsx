import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UsersTable from "../UsersTable";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UsersTable Component", () => {
  const mockUsers = [
    {
      _id: "1",
      organization: "Lendsqr",
      username: "john_doe",
      email: "john@example.com",
      phone: "08012345678",
      date_joined: "2023-01-15T10:30:00Z",
      status: "Active",
    },
    {
      _id: "2",
      organization: "Lendstar",
      username: "jane_smith",
      email: "jane@example.com",
      phone: "08087654321",
      date_joined: "2023-02-20T14:20:00Z",
      status: "Inactive",
    },
  ];

  const defaultProps = {
    users: mockUsers,
    onSort: jest.fn(),
    onToggleFilters: jest.fn(),
    sortColumn: "",
    sortDirection: "asc" as const,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderUsersTable = (props = {}) => {
    return render(
      <MemoryRouter>
        <UsersTable {...defaultProps} {...props} />
      </MemoryRouter>
    );
  };

  describe("Basic Rendering", () => {
    it("renders the users table with headers", () => {
      renderUsersTable();

      expect(screen.getByText("Organization")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Date Joined")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("renders user data correctly", () => {
      renderUsersTable();

      expect(screen.getByText("john_doe")).toBeInTheDocument();
      expect(screen.getByText("jane_smith")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      expect(screen.getByText("Lendsqr")).toBeInTheDocument();
      expect(screen.getByText("Lendstar")).toBeInTheDocument();
    });

    it("renders phone numbers with leading zero", () => {
      renderUsersTable();

      expect(screen.getByText("008012345678")).toBeInTheDocument();
      expect(screen.getByText("008087654321")).toBeInTheDocument();
    });

    it("renders action buttons for each user", () => {
      renderUsersTable();

      const actionButtons = screen.getAllByLabelText("More actions");
      expect(actionButtons).toHaveLength(mockUsers.length);
    });
  });

  describe("Loading State", () => {
    it("shows loading message when isLoading is true", () => {
      renderUsersTable({ isLoading: true, users: [] });

      expect(screen.getByText("Loading users...")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("shows no users message when no users", () => {
      renderUsersTable({ users: [] });

      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

  describe("Sorting Functionality", () => {
    it("calls onSort when column header is clicked", () => {
      const onSort = jest.fn();
      renderUsersTable({ onSort });

      fireEvent.click(screen.getByText("Username"));
      expect(onSort).toHaveBeenCalledWith("username");

      fireEvent.click(screen.getByText("Organization"));
      expect(onSort).toHaveBeenCalledWith("organization");
    });

    it("shows sort indicator for active column", () => {
      renderUsersTable({ sortColumn: "username", sortDirection: "asc" });

      const usernameHeader = screen.getByText("Username");
      expect(usernameHeader.closest("th")).toHaveClass("sorted-asc");
    });

    it("shows different sort indicator for descending order", () => {
      renderUsersTable({ sortColumn: "username", sortDirection: "desc" });

      const usernameHeader = screen.getByText("Username");
      expect(usernameHeader.closest("th")).toHaveClass("sorted-desc");
    });
  });

  describe("Filter Toggle", () => {
    it("calls onToggleFilters when filter button is clicked", () => {
      const onToggleFilters = jest.fn();
      renderUsersTable({ onToggleFilters });

      // Get the first filter button (there are multiple)
      const filterButtons = screen.getAllByRole("button");
      const filterButton = filterButtons.find((button) =>
        button.querySelector("svg")
      );

      if (filterButton) {
        fireEvent.click(filterButton);
        expect(onToggleFilters).toHaveBeenCalled();
      }
    });
  });

  describe("Action Menu", () => {
    it("shows action menu when action button is clicked", () => {
      renderUsersTable();

      const actionButton = screen.getAllByLabelText("More actions")[0];
      fireEvent.click(actionButton);

      expect(screen.getByText("View Details")).toBeInTheDocument();
      expect(screen.getByText("Blacklist User")).toBeInTheDocument();
      expect(screen.getByText("Activate User")).toBeInTheDocument();
    });

    it("navigates to user details when View Details is clicked", () => {
      renderUsersTable();

      const actionButton = screen.getAllByLabelText("More actions")[0];
      fireEvent.click(actionButton);

      const viewDetailsButton = screen.getByText("View Details");
      fireEvent.click(viewDetailsButton);

      expect(mockNavigate).toHaveBeenCalledWith("/dashboard/users/1");
    });

    it("closes action menu when clicking outside", () => {
      renderUsersTable();

      const actionButton = screen.getAllByLabelText("More actions")[0];
      fireEvent.click(actionButton);

      expect(screen.getByText("View Details")).toBeInTheDocument();

      // Click outside
      fireEvent.click(document.body);

      expect(screen.queryByText("View Details")).not.toBeInTheDocument();
    });
  });

  describe("Status Display", () => {
    it("displays user status with correct styling", () => {
      renderUsersTable();

      const activeStatus = screen.getByText("Active");
      const inactiveStatus = screen.getByText("Inactive");

      expect(activeStatus).toHaveClass("users-table__status--active");
      expect(inactiveStatus).toHaveClass("users-table__status--inactive");
    });

    it("formats status to lowercase for CSS classes", () => {
      const usersWithDifferentStatus = [
        { ...mockUsers[0], status: "PENDING" },
        { ...mockUsers[1], status: "BLACKLISTED" },
      ];

      renderUsersTable({ users: usersWithDifferentStatus });

      const pendingStatus = screen.getByText("PENDING");
      const blacklistedStatus = screen.getByText("BLACKLISTED");

      expect(pendingStatus).toHaveClass("users-table__status--pending");
      expect(blacklistedStatus).toHaveClass("users-table__status--blacklisted");
    });
  });

  describe("Date Formatting", () => {
    it("formats dates correctly", () => {
      renderUsersTable();

      // The component formats dates to locale string with specific options
      expect(screen.getByText(/Jan 15, 2023/)).toBeInTheDocument();
      expect(screen.getByText(/Feb 20, 2023/)).toBeInTheDocument();
    });
  });

  describe("Data Handling", () => {
    it("handles missing user data gracefully", () => {
      const usersWithMissingData = [
        {
          _id: "3",
          // Missing fields
        },
      ];

      renderUsersTable({ users: usersWithMissingData });

      expect(screen.getByText("Lendsqr")).toBeInTheDocument(); // Default organization
      const dashElements = screen.getAllByText("-");
      expect(dashElements.length).toBeGreaterThanOrEqual(2); // Username and email show as "-"
      expect(screen.getByText("Inactive")).toBeInTheDocument(); // Default status
    });

    it("handles phone number formatting", () => {
      const usersWithNumericPhone = [{ ...mockUsers[0], phone: 8012345678 }];

      renderUsersTable({ users: usersWithNumericPhone });

      expect(screen.getByText("08012345678")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper table structure", () => {
      renderUsersTable();

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(7); // 6 data columns + 1 action column
      expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2 data rows
    });

    it("has accessible action buttons", () => {
      renderUsersTable();

      const actionButtons = screen.getAllByLabelText("More actions");
      expect(actionButtons).toHaveLength(mockUsers.length);
    });

    it("has sortable column headers", () => {
      renderUsersTable();

      const sortableHeaders = screen.getAllByRole("columnheader");
      // Check that most headers are clickable (excluding the actions column)
      const clickableHeaders = sortableHeaders.filter((header) =>
        header.classList.contains("sortable")
      );
      expect(clickableHeaders.length).toBeGreaterThan(0);
    });
  });
});
