import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

export default function Pagination({
    currentPage,
    totalPages,
    onPreviousPage,
    onNextPage,
    onPageChange,
}) {
    const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);
    const firstPage = 1;
    const lastPage = totalPages;
    const adjacent = 2; // Number of pages to show on either side of the current page

    return (
        <div>
            <nav className="flex items-center justify-between border-t border-gray-300 dark:border-gray-600 px-4 sm:px-0 py-4">
                <div className="-mt-px flex w-0 flex-1">
                    <button
                        onClick={onPreviousPage}
                        disabled={currentPage === firstPage}
                        className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
                    >
                        <ArrowLongLeftIcon
                            aria-hidden="true"
                            className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400"
                        />
                        Previous
                    </button>
                </div>
                <div className="hidden md:-mt-px md:flex">
                    {pageNumbers.map((number, index) => {
                        const isNearCurrentPage =
                            Math.abs(currentPage - number) <= adjacent;
                        const shouldShowDotsBefore =
                            number === firstPage + 1 &&
                            currentPage > firstPage + adjacent + 1;
                        const shouldShowDotsAfter =
                            number === lastPage - 1 &&
                            currentPage < lastPage - adjacent - 1;

                        // Display dots when the current page is far
                        if (shouldShowDotsBefore || shouldShowDotsAfter) {
                            return (
                                <span
                                    key={`dots-${index}`}
                                    className="px-4 pt-4 text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    ...
                                </span>
                            );
                        }

                        // Show number buttons
                        if (
                            number === firstPage ||
                            isNearCurrentPage ||
                            number === lastPage
                        ) {
                            return (
                                <button
                                    key={number}
                                    onClick={() => onPageChange(number)}
                                    className={`inline-flex items-center border-t-2 ${
                                        currentPage === number
                                            ? "border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300"
                                            : "border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500"
                                    } px-4 pt-4 text-sm font-medium`}
                                >
                                    {number}
                                </button>
                            );
                        }

                        return null;
                    })}
                </div>

                <div className="md:hidden flex text-center ">
                    <span className="px-4 pt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentPage} of {totalPages}
                    </span>
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                    <button
                        onClick={onNextPage}
                        disabled={currentPage === lastPage}
                        className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
                    >
                        Next
                        <ArrowLongRightIcon
                            aria-hidden="true"
                            className="ml-3 h-5 w-5 text-gray-500 dark:text-gray-400"
                        />
                    </button>
                </div>
            </nav>
        </div>
    );
}
