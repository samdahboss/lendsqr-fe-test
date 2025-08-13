import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FilterForm } from "../FilterForm";

describe("FilterForm Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onFiltersChange: jest.fn(),
    filters: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderFilterForm = (props = {}) => {
    return render(<FilterForm {...defaultProps} {...props} />);
  };

  describe("Basic Rendering", () => {
    it("renders when isOpen is true", () => {
      renderFilterForm();

      expect(screen.getByText("Organization")).toBeInTheDocument();
      expect(screen.getByText("Username")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Date")).toBeInTheDocument();
      expect(screen.getByText("Phone Number")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      renderFilterForm({ isOpen: false });

      expect(screen.queryByText("Organization")).not.toBeInTheDocument();
    });

    it("renders all filter fields", () => {
      renderFilterForm();

      expect(screen.getByPlaceholderText("User")).toBeInTheDocument(); // Username input
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument(); // Email input
      expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument(); // Phone input

      // Check for date input by type
      const dateInput = document.querySelector('input[type="date"]');
      expect(dateInput).toBeInTheDocument();

      // Check for select elements
      const selects = screen.getAllByRole("combobox");
      expect(selects).toHaveLength(2); // Organization and Status selects
    });

    it("renders action buttons", () => {
      renderFilterForm();

      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Filter" })
      ).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("updates input values when typing", async () => {
      renderFilterForm();

      const usernameInput = screen.getByPlaceholderText("User");
      const emailInput = screen.getByPlaceholderText("Email");
      const phoneInput = screen.getByPlaceholderText("Phone Number");

      fireEvent.change(usernameInput, { target: { value: "john_doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(phoneInput, { target: { value: "1234567890" } });

      expect(usernameInput).toHaveValue("john_doe");
      expect(emailInput).toHaveValue("john@example.com");
      expect(phoneInput).toHaveValue("1234567890");
    });

    it("handles organization dropdown selection", () => {
      renderFilterForm();

      // Get organization select by finding it within the organization field
      const organizationField = screen
        .getByText("Organization")
        .closest(".filter-form__field");
      const organizationSelect = organizationField?.querySelector("select");

      expect(organizationSelect).toBeInTheDocument();
      fireEvent.change(organizationSelect!, { target: { value: "Lendsqr" } });
      expect(organizationSelect).toHaveValue("Lendsqr");
    });

    it("handles status dropdown selection", () => {
      renderFilterForm();

      // Get status select by finding it within the status field
      const statusField = screen
        .getByText("Status")
        .closest(".filter-form__field");
      const statusSelect = statusField?.querySelector("select");

      expect(statusSelect).toBeInTheDocument();
      fireEvent.change(statusSelect!, { target: { value: "Active" } });
      expect(statusSelect).toHaveValue("Active");
    });
    it("calls onFiltersChange when form is submitted", async () => {
      const onFiltersChange = jest.fn();
      renderFilterForm({ onFiltersChange });

      const usernameInput = screen.getByPlaceholderText("User");
      const filterButton = screen.getByRole("button", { name: "Filter" });

      fireEvent.change(usernameInput, { target: { value: "john_doe" } });
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(onFiltersChange).toHaveBeenCalledWith(
          expect.objectContaining({
            username: "john_doe",
          })
        );
      });
    });

    it("calls onClose when filter button is clicked", async () => {
      const onClose = jest.fn();
      renderFilterForm({ onClose });

      const filterButton = screen.getByRole("button", { name: "Filter" });
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it("resets form and calls onClose when reset button is clicked", async () => {
      const onFiltersChange = jest.fn();
      const onClose = jest.fn();
      renderFilterForm({ onFiltersChange, onClose });

      const usernameInput = screen.getByPlaceholderText("User");
      const resetButton = screen.getByRole("button", { name: "Reset" });

      // Add some values
      fireEvent.change(usernameInput, { target: { value: "john_doe" } });

      // Reset
      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(onFiltersChange).toHaveBeenCalledWith({});
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  describe("Pre-filled Values", () => {
    it("displays current filter values", () => {
      const filters = {
        organization: "Lendsqr",
        username: "john_doe",
        status: "Active",
        email: "john@example.com",
        phone: "1234567890",
        date: "2023-01-15",
      };

      renderFilterForm({ filters });

      expect(screen.getByDisplayValue("Lendsqr")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john_doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Active")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
      expect(screen.getByDisplayValue("2023-01-15")).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("handles empty form submission", async () => {
      const onFiltersChange = jest.fn();
      renderFilterForm({ onFiltersChange });

      const filterButton = screen.getByRole("button", { name: "Filter" });
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(onFiltersChange).toHaveBeenCalledWith({});
      });
    });

    it("preserves filter state during interaction", async () => {
      const onFiltersChange = jest.fn();
      renderFilterForm({ onFiltersChange });

      const usernameInput = screen.getByPlaceholderText("User");
      const emailInput = screen.getByPlaceholderText("Email");

      fireEvent.change(usernameInput, { target: { value: "john" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });

      const filterButton = screen.getByRole("button", { name: "Filter" });
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(onFiltersChange).toHaveBeenCalledWith({
          username: "john",
          email: "john@example.com",
        });
      });
    });
  });

  describe("Click Outside Behavior", () => {
    it("calls onClose when clicking outside the form", async () => {
      const onClose = jest.fn();
      renderFilterForm({ onClose });

      // Click outside the form
      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it("does not call onClose when clicking inside the form", async () => {
      const onClose = jest.fn();
      renderFilterForm({ onClose });

      const usernameInput = screen.getByPlaceholderText("User");
      fireEvent.mouseDown(usernameInput);

      // Wait a bit to ensure onClose is not called
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Component State Management", () => {
    it("updates local state when props change", async () => {
      const { rerender } = renderFilterForm({
        filters: { username: "initial" },
      });

      expect(screen.getByDisplayValue("initial")).toBeInTheDocument();

      rerender(
        <FilterForm {...defaultProps} filters={{ username: "updated" }} />
      );

      await waitFor(() => {
        expect(screen.getByDisplayValue("updated")).toBeInTheDocument();
      });
    });

    it("handles date input correctly", () => {
      renderFilterForm();

      // Get date input by type
      const dateInput = document.querySelector(
        'input[type="date"]'
      ) as HTMLInputElement;
      const dateField = dateInput?.closest(".filter-form__field");
      const label = dateField?.querySelector("label");

      expect(label?.textContent).toBe("Date");
      expect(dateInput).toBeInTheDocument();

      fireEvent.change(dateInput, { target: { value: "2023-12-25" } });
      expect(dateInput).toHaveValue("2023-12-25");
    });
  });

  describe("Organization Options", () => {
    it("includes all organization options", () => {
      renderFilterForm();

      // Check that organization options exist by checking within the organization field
      const organizationField = screen
        .getByText("Organization")
        .closest(".filter-form__field");
      const organizationSelect = organizationField?.querySelector("select");

      expect(organizationSelect).toBeInTheDocument();
      expect(organizationSelect?.innerHTML).toContain(
        'value="">Select</option>'
      );
      expect(organizationSelect?.innerHTML).toContain(
        'value="Lendsqr">Lendsqr</option>'
      );
      expect(organizationSelect?.innerHTML).toContain(
        'value="Irorun">Irorun</option>'
      );
      expect(organizationSelect?.innerHTML).toContain(
        'value="Lendstar">Lendstar</option>'
      );
    });
  });

  describe("Status Options", () => {
    it("includes all status options", () => {
      renderFilterForm();

      // Check for status options
      expect(screen.getAllByText("Select")).toHaveLength(2); // Organization and Status
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Inactive")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Blacklisted")).toBeInTheDocument();
    });
  });
});
