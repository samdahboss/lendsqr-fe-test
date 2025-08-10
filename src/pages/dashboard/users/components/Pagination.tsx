import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) => {

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const pages: (number | string)[] = [];

    // Always show first page
    if (currentPage > delta + 1) {
      pages.push(1);
      if (currentPage > delta + 2) {
        pages.push("...");
      }
    }

    // Show pages around current page
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    // Always show last page
    if (currentPage < totalPages - delta) {
      if (currentPage < totalPages - delta - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='pagination'>
      <div className='pagination__info'>
        <div className='pagination__showing'>
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className='pagination__select'
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>out of {totalItems.toLocaleString()}</span>
        </div>
      </div>

      <div className='pagination__controls'>
        <div className='pagination__nav'>
          <button
            className='pagination__button pagination__button--prev'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label='Previous page'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.33341 2.66699L4.66675 7.33366L9.33341 12.0003'
                stroke='#545F7D'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <div className='pagination__pages'>
            {pageNumbers.map((pageNum, index) => (
              <button
                key={index}
                className={`pagination__button ${
                  pageNum === currentPage ? "pagination__button--active" : ""
                } ${pageNum === "..." ? "pagination__button--ellipsis" : ""}`}
                onClick={() =>
                  typeof pageNum === "number" && onPageChange(pageNum)
                }
                disabled={pageNum === "..."}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            className='pagination__button pagination__button--next'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label='Next page'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.66675 2.66699L9.33341 7.33366L4.66675 12.0003'
                stroke='#545F7D'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
