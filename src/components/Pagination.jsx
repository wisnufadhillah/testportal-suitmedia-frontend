import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const visiblePages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all 
    ${currentPage === 1 ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "bg-white hover:border-orange-500 hover:text-orange-500 text-gray-600"}`}
            >
                <ArrowLeft className="w-7 h-7" />
            </button>

            {visiblePages().map((page, index) =>
                page === "..." ? (
                    <span key={`dots-${index}`} className="w-10 h-10 flex items-center justify-center rounded-md border bg-white text-gray-400">
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all
                            ${page === currentPage ? "bg-orange-500 text-gray-400 border-orange-500" : "bg-white hover:border-orange-500 hover:text-orange-500 text-gray-600"}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-md border transition-all
    ${currentPage === totalPages ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "bg-white hover:border-orange-500 hover:text-orange-500 text-gray-600"}`}
            >
                <ChevronRight className="w-7 h-7" />
            </button>
        </div>
    );
}
