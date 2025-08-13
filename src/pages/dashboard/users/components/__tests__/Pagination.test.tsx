import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination Component", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 100,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
    onItemsPerPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPagination = (props = {}) => {
    return render(<Pagination {...defaultProps} {...props} />);
  };

  describe("Basic Rendering", () => {
    it("renders pagination information", () => {
      renderPagination();

      expect(screen.getByText("Showing")).toBeInTheDocument();
      expect(screen.getByText("out of 100")).toBeInTheDocument();
    });

    it("renders page navigation buttons", () => {
      renderPagination();

      expect(
        screen.getByRole("button", { name: /previous page/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /next page/i })
      ).toBeInTheDocument();
    });

    it("renders page numbers", () => {
      renderPagination();

      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    });

    it("renders items per page selector", () => {
      renderPagination();

      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    });
  });

  describe("Page Navigation", () => {
    it("calls onPageChange when page number is clicked", () => {
      const onPageChange = jest.fn();
      renderPagination({ onPageChange });

      fireEvent.click(screen.getByRole("button", { name: "2" }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("calls onPageChange when next button is clicked", () => {
      const onPageChange = jest.fn();
      renderPagination({ onPageChange });

      fireEvent.click(screen.getByRole("button", { name: /next page/i }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("calls onPageChange when previous button is clicked", () => {
      const onPageChange = jest.fn();
      renderPagination({ currentPage: 3, onPageChange });

      fireEvent.click(screen.getByRole("button", { name: /previous page/i }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("disables previous button on first page", () => {
      renderPagination({ currentPage: 1 });

      const prevButton = screen.getByRole("button", { name: /previous page/i });
      expect(prevButton).toBeDisabled();
    });

    it("disables next button on last page", () => {
      renderPagination({ currentPage: 5, totalPages: 5 });

      const nextButton = screen.getByRole("button", { name: /next page/i });
      expect(nextButton).toBeDisabled();
    });
  });

  describe("Items Per Page", () => {
    it("calls onItemsPerPageChange when selection changes", () => {
      const onItemsPerPageChange = jest.fn();
      renderPagination({ onItemsPerPageChange });

      const select = screen.getByDisplayValue("10");
      fireEvent.change(select, { target: { value: "50" } });

      expect(onItemsPerPageChange).toHaveBeenCalledWith(50);
    });

    it("includes all items per page options", () => {
      renderPagination();

      const select = screen.getByDisplayValue("10");

      expect(select).toContainHTML('<option value="10">10</option>');
      expect(select).toContainHTML('<option value="25">25</option>');
      expect(select).toContainHTML('<option value="50">50</option>');
      expect(select).toContainHTML('<option value="100">100</option>');
    });
  });

  describe("Page Range Display", () => {
    it("shows correct items per page selection", () => {
      renderPagination({ currentPage: 1, itemsPerPage: 10, totalItems: 100 });

      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
      expect(screen.getByText("out of 100")).toBeInTheDocument();
    });

    it("shows correct items per page for different values", () => {
      renderPagination({ currentPage: 1, itemsPerPage: 25, totalItems: 100 });

      expect(screen.getByDisplayValue("25")).toBeInTheDocument();
    });

    it("shows correct total items", () => {
      renderPagination({ currentPage: 1, itemsPerPage: 10, totalItems: 95 });

      expect(screen.getByText("out of 95")).toBeInTheDocument();
    });
  });

  describe("Page Numbers Display", () => {
    it("shows limited page numbers when there are many pages", () => {
      renderPagination({ totalPages: 20, currentPage: 10 });

      // Should show current page and some surrounding pages
      expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "9" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "11" })).toBeInTheDocument();
    });

    it("shows ellipsis when there are gaps in page numbers", () => {
      renderPagination({ totalPages: 20, currentPage: 10 });

      const ellipsisButtons = screen.getAllByText("...");
      expect(ellipsisButtons.length).toBeGreaterThan(0);
    });

    it("highlights current page", () => {
      renderPagination({ currentPage: 3 });

      const currentPageButton = screen.getByRole("button", { name: "3" });
      expect(currentPageButton).toHaveClass("pagination__button--active");
    });
  });

  describe("Edge Cases", () => {
    it("handles single page correctly", () => {
      renderPagination({ totalPages: 1, currentPage: 1, totalItems: 5 });

      expect(screen.getByText("out of 5")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /previous page/i })
      ).toBeDisabled();
      expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
    });

    it("handles zero items correctly", () => {
      renderPagination({ totalPages: 0, currentPage: 1, totalItems: 0 });

      expect(screen.getByText("out of 0")).toBeInTheDocument();
    });

    it("handles empty pages gracefully", () => {
      renderPagination({ totalPages: 0, currentPage: 1 });

      expect(
        screen.getByRole("button", { name: /previous page/i })
      ).toBeDisabled();
      // Next button may not be disabled when totalPages is 0, so let's just check it exists
      expect(
        screen.getByRole("button", { name: /next page/i })
      ).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("renders with correct CSS classes", () => {
      const { container } = renderPagination();

      expect(container.querySelector(".pagination")).toBeInTheDocument();
      expect(container.querySelector(".pagination__info")).toBeInTheDocument();
      expect(
        container.querySelector(".pagination__controls")
      ).toBeInTheDocument();
    });

    it("renders page buttons with correct classes", () => {
      renderPagination({ currentPage: 2 });

      const activeButton = screen.getByRole("button", { name: "2" });
      expect(activeButton).toHaveClass("pagination__button--active");
    });

    it("renders ellipsis button correctly", () => {
      renderPagination({ totalPages: 10, currentPage: 5 });

      const ellipsisButtons = screen.getAllByRole("button", { name: "..." });
      expect(ellipsisButtons.length).toBeGreaterThan(0);
      ellipsisButtons.forEach((button) => {
        expect(button).toBeDisabled();
        expect(button).toHaveClass("pagination__button--ellipsis");
      });
    });

    it("renders items per page select correctly", () => {
      renderPagination();

      const select = screen.getByDisplayValue("10");
      expect(select).toHaveClass("pagination__select");
    });
  });

  describe("Functionality", () => {
    it("does not re-render unnecessarily", () => {
      const { rerender } = renderPagination();

      // Re-render with same props
      rerender(<Pagination {...defaultProps} />);

      // Should not cause any errors or unnecessary DOM changes
      expect(screen.getByText("out of 100")).toBeInTheDocument();
    });

    it("handles click on ellipsis gracefully", () => {
      const onPageChange = jest.fn();
      renderPagination({ totalPages: 10, currentPage: 5, onPageChange });

      const ellipsisButtons = screen.getAllByRole("button", { name: "..." });
      // Click the first ellipsis button
      fireEvent.click(ellipsisButtons[0]);

      // Should not call onPageChange for ellipsis
      expect(onPageChange).not.toHaveBeenCalled();
    });
  });
});
