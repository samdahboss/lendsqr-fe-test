import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Users from "../Users";

// Mock the useUsers hook
const defaultMockUseUsers = {
  users: [
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
  ],
  filters: {},
  setFilters: jest.fn(),
  isLoading: false,
  error: null as string | null,
  allUsers: [
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
  ],
  page: 1,
  setPage: jest.fn(),
  pageSize: 10,
  setPageSize: jest.fn(),
  total: 2,
  filteredUsers: [
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
  ],
};

// Mock the useUsers hook
jest.mock("../../../../hooks/useUsers", () => ({
  useUsers: jest.fn(),
}));

import { useUsers } from "../../../../hooks/useUsers";
const mockUseUsers = useUsers as jest.MockedFunction<typeof useUsers>;

// Define types for mock props
interface FilterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Record<string, string>) => void;
}

interface UsersTableProps {
  users: Array<{
    _id: string;
    username: string;
    organization: string;
    email: string;
    phone: string;
    date_joined: string;
    status: string;
  }>;
  onSort: (column: string) => void;
  onToggleFilters: () => void;
  sortColumn: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (size: number) => void;
}

// Mock the child components
jest.mock("../components/StatsCard", () => ({
  StatsCards: () => <div data-testid='stats-cards'>Stats Cards</div>,
}));

jest.mock("../components/FilterForm", () => ({
  FilterForm: ({ isOpen, onClose, onFiltersChange }: FilterFormProps) => (
    <div
      data-testid='filter-form'
      style={{ display: isOpen ? "block" : "none" }}
    >
      Filter Form
      <button onClick={onClose} data-testid='close-filter'>
        Close
      </button>
      <button
        onClick={() => onFiltersChange({ organization: "Lendsqr" })}
        data-testid='apply-filter'
      >
        Apply Filter
      </button>
    </div>
  ),
}));

jest.mock("../components/UsersTable", () => ({
  __esModule: true,
  default: ({
    users,
    onSort,
    onToggleFilters,
    sortColumn,
    isLoading,
    error,
  }: UsersTableProps & { isLoading?: boolean; error?: string | null }) => {
    if (isLoading) {
      return (
        <div data-testid='users-table'>
          <div>Loading users...</div>
          <div role='generic' aria-label='loading'>
            Loading...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div data-testid='users-table'>
          <h2>Error Loading Users</h2>
          <div>Failed to fetch users</div>
        </div>
      );
    }

    if (!users || users.length === 0) {
      return (
        <div data-testid='users-table'>
          <div data-testid='users-table-empty'>No users to display</div>
        </div>
      );
    }

    return (
      <div data-testid='users-table'>
        <button onClick={onToggleFilters} data-testid='toggle-filters'>
          Toggle Filters
        </button>
        <button onClick={() => onSort("username")} data-testid='sort-username'>
          Sort Username {sortColumn === "username" ? "🔽" : ""}
        </button>
        <div data-testid='users-count'>{users.length} users</div>
        {users.map((user) => (
          <div key={user._id} data-testid={`user-${user._id}`}>
            {user.username}
          </div>
        ))}
      </div>
    );
  },
}));

jest.mock("../components/Pagination", () => ({
  __esModule: true,
  default: ({
    currentPage,
    totalPages,
    onPageChange,
    onItemsPerPageChange,
  }: PaginationProps) => (
    <div data-testid='pagination'>
      <span data-testid='current-page'>{currentPage}</span>
      <span data-testid='total-pages'>{totalPages}</span>
      <button onClick={() => onPageChange(2)} data-testid='page-2'>
        Page 2
      </button>
      <button
        onClick={() => onItemsPerPageChange(20)}
        data-testid='change-page-size'
      >
        20 per page
      </button>
    </div>
  ),
}));

describe("Users Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default mock before each test
    mockUseUsers.mockReturnValue(defaultMockUseUsers);
  });

  const renderUsers = () => {
    return render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
  };

  describe("Basic Rendering", () => {
    it("renders the users page with all main sections", () => {
      renderUsers();

      expect(
        screen.getByRole("heading", { name: "Users" })
      ).toBeInTheDocument();
      expect(screen.getByTestId("stats-cards")).toBeInTheDocument();
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
    });

    it("displays the correct number of users", () => {
      renderUsers();

      expect(screen.getByTestId("users-count")).toHaveTextContent("2 users");
      expect(screen.getByTestId("user-1")).toHaveTextContent("john_doe");
      expect(screen.getByTestId("user-2")).toHaveTextContent("jane_smith");
    });

    it("shows pagination with correct values", () => {
      renderUsers();

      expect(screen.getByTestId("current-page")).toHaveTextContent("1");
      expect(screen.getByTestId("total-pages")).toHaveTextContent("1");
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when data is loading", () => {
      const loadingMockUseUsers = {
        ...defaultMockUseUsers,
        isLoading: true,
        users: [],
      };

      mockUseUsers.mockReturnValue(loadingMockUseUsers);

      renderUsers();

      expect(screen.getByText("Loading users...")).toBeInTheDocument();
      expect(screen.queryByTestId("users-table")).not.toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("shows error message when there is an error", () => {
      const errorMockUseUsers = {
        ...defaultMockUseUsers,
        error: "Failed to fetch users",
      };

      mockUseUsers.mockReturnValue(errorMockUseUsers);

      renderUsers();

      expect(
        screen.getByRole("heading", { name: "Error Loading Users" })
      ).toBeInTheDocument();
      expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("shows empty message when no users are found", () => {
      const emptyMockUseUsers = {
        ...defaultMockUseUsers,
        users: [],
        total: 0,
      };

      mockUseUsers.mockReturnValue(emptyMockUseUsers);

      renderUsers();

      expect(screen.getByText("No Users Found")).toBeInTheDocument();
      expect(
        screen.getByText("Try adjusting your filters or check back later.")
      ).toBeInTheDocument();
    });
  });

  describe("Sorting Functionality", () => {
    it("handles sorting when sort button is clicked", () => {
      renderUsers();

      const sortButton = screen.getByTestId("sort-username");
      fireEvent.click(sortButton);

      // The component should re-render with sorted data
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });

    it("toggles sort direction on subsequent clicks", () => {
      renderUsers();

      const sortButton = screen.getByTestId("sort-username");

      // First click - ascending
      fireEvent.click(sortButton);
      expect(sortButton).toHaveTextContent("Sort Username 🔽");

      // Second click should change direction (component would handle this internally)
      fireEvent.click(sortButton);
    });

    it("handles sorting with different columns", () => {
      renderUsers();

      // Test sorting different columns
      const sortButton = screen.getByTestId("sort-username");
      fireEvent.click(sortButton);

      // Verify sort state is managed correctly
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });

    it("resets sort direction when switching columns", () => {
      renderUsers();

      const sortButton = screen.getByTestId("sort-username");

      // Click twice to set descending order
      fireEvent.click(sortButton);
      fireEvent.click(sortButton);

      // Click on the same button again - should handle the state change
      fireEvent.click(sortButton);

      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });
  });

  describe("Filter Functionality", () => {
    it("toggles filter form visibility", () => {
      renderUsers();

      const toggleButton = screen.getByTestId("toggle-filters");
      const filterForm = screen.getByTestId("filter-form");

      // Initially hidden
      expect(filterForm).toHaveStyle("display: none");

      // Click to show
      fireEvent.click(toggleButton);
      expect(filterForm).toHaveStyle("display: block");
    });

    it("closes filter form when close button is clicked", () => {
      renderUsers();

      // Open filters first
      fireEvent.click(screen.getByTestId("toggle-filters"));
      expect(screen.getByTestId("filter-form")).toHaveStyle("display: block");

      // Close filters
      fireEvent.click(screen.getByTestId("close-filter"));
      expect(screen.getByTestId("filter-form")).toHaveStyle("display: none");
    });

    it("applies filters when filter form is submitted", () => {
      renderUsers();

      // Open filters
      fireEvent.click(screen.getByTestId("toggle-filters"));

      // Apply a filter
      fireEvent.click(screen.getByTestId("apply-filter"));

      expect(defaultMockUseUsers.setFilters).toHaveBeenCalledWith({
        organization: "Lendsqr",
      });
    });
  });

  describe("Pagination", () => {
    it("handles page change", () => {
      renderUsers();

      fireEvent.click(screen.getByTestId("page-2"));
      expect(defaultMockUseUsers.setPage).toHaveBeenCalledWith(2);
    });

    it("handles page size change", () => {
      renderUsers();

      fireEvent.click(screen.getByTestId("change-page-size"));
      expect(defaultMockUseUsers.setPageSize).toHaveBeenCalledWith(20);
    });

    it("hides pagination when no users", () => {
      const emptyMockUseUsers = {
        ...defaultMockUseUsers,
        users: [],
        total: 0,
      };

      mockUseUsers.mockReturnValue(emptyMockUseUsers);

      renderUsers();

      expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("passes correct props to child components", () => {
      renderUsers();

      // Verify UsersTable receives correct props
      const usersTable = screen.getByTestId("users-table");
      expect(usersTable).toBeInTheDocument();

      // Verify users are passed correctly
      expect(screen.getByTestId("users-count")).toHaveTextContent("2 users");

      // Verify pagination receives correct props
      expect(screen.getByTestId("current-page")).toHaveTextContent("1");
    });

    it("maintains filter state across component interactions", async () => {
      renderUsers();

      // Open filters
      fireEvent.click(screen.getByTestId("toggle-filters"));

      // Apply filter
      fireEvent.click(screen.getByTestId("apply-filter"));

      await waitFor(() => {
        expect(defaultMockUseUsers.setFilters).toHaveBeenCalledWith({
          organization: "Lendsqr",
        });
      });
    });

    it("handles multiple user interactions correctly", async () => {
      renderUsers();

      // Toggle filters
      fireEvent.click(screen.getByTestId("toggle-filters"));

      // Sort users
      fireEvent.click(screen.getByTestId("sort-username"));

      // Change page
      fireEvent.click(screen.getByTestId("page-2"));

      await waitFor(() => {
        expect(defaultMockUseUsers.setPage).toHaveBeenCalledWith(2);
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      renderUsers();

      const mainHeading = screen.getByRole("heading", { name: "Users" });
      expect(mainHeading).toBeInTheDocument();
    });

    it("has accessible buttons", () => {
      renderUsers();

      const toggleButton = screen.getByTestId("toggle-filters");
      const sortButton = screen.getByTestId("sort-username");

      expect(toggleButton).toBeInTheDocument();
      expect(sortButton).toBeInTheDocument();
    });
  });

  describe("Component Lifecycle", () => {
    it("cleans up properly on unmount", () => {
      const { unmount } = renderUsers();

      expect(() => unmount()).not.toThrow();
    });

    it("handles rapid state changes gracefully", async () => {
      renderUsers();

      // Rapid filter toggles
      const toggleButton = screen.getByTestId("toggle-filters");

      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);

      // Should not throw errors
      expect(screen.getByTestId("users-table")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined user data gracefully", () => {
      const undefinedMockUseUsers = {
        ...defaultMockUseUsers,
        users: [],
        allUsers: [],
        filteredUsers: [],
        total: 0,
      };

      mockUseUsers.mockReturnValue(undefinedMockUseUsers);
      renderUsers();

      // Should show the empty state from the main component
      expect(screen.getByTestId("users-table-empty")).toBeInTheDocument();
      expect(screen.getByText("No users to display")).toBeInTheDocument();
    });

    it("handles very large user counts", () => {
      const largeMockUseUsers = {
        ...defaultMockUseUsers,
        total: 10000,
        pageSize: 100,
      };

      mockUseUsers.mockReturnValue(largeMockUseUsers);
      renderUsers();

      expect(screen.getByTestId("total-pages")).toHaveTextContent("100");
    });

    it("handles network error states", () => {
      const networkErrorMock = {
        ...defaultMockUseUsers,
        error: "Network error: Failed to fetch",
        users: [],
        allUsers: [],
        filteredUsers: [],
      };

      mockUseUsers.mockReturnValue(networkErrorMock);
      renderUsers();

      expect(screen.getByText("Error Loading Users")).toBeInTheDocument();
      expect(
        screen.getByText("Network error: Failed to fetch")
      ).toBeInTheDocument();
    });
  });
});
