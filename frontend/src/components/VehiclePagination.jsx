import React from "react";

const VehiclePagination = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  // Generate a limited page range for mobile
  const pageNumbers = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Prev
      </button>

      {/* Page numbers */}
      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
          >
            1
          </button>
          {start > 2 && <span className="px-2 py-1">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded ${
            currentPage === num
              ? "bg-blue-500 text-white"
              : "border bg-white hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2 py-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default VehiclePagination;
