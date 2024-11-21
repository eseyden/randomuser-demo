/**
 * SortButton.JSX
 *
 * Sort buttons that dispatch appropriate sort event to the reducer
 *
 */
import { useContext } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid/index.js";
import {
    RandomUsersContext,
    RandomUsersDispatchContext,
} from "@/Providers/RandomUsersProvider.jsx";

export default function SortButton({ sortKey, children }) {
    const dispatch = useContext(RandomUsersDispatchContext);
    const state = useContext(RandomUsersContext);

    const handleClick = () => {
        // Let the reducer sort it out
        dispatch({ type: "SORT_USERS", sort: sortKey });
    };

    const isActive = state.sort === sortKey;
    const sortDirection = state.sortDirection;

    const baseClass =
        "px-2 py-1 text-md font-medium rounded-md focus:outline-none flex flex-row items-center transition";
    const activeClass =
        "bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-200 hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800";
    const inactiveClass =
        "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800";

    // Conditionally change button class if it is the active sort
    const buttonClass = isActive
        ? `${baseClass} ${activeClass}`
        : `${baseClass} ${inactiveClass}`;

    // Visual indication of state is not enough.
    const ariaLabel = isActive
        ? `Sorted by ${children} in ${sortDirection === "asc" ? "ascending" : "descending"} order`
        : `Sort by ${children}`;

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            aria-pressed={isActive}
            aria-label={ariaLabel}
        >
            {isActive &&
                (sortDirection === "asc" ? (
                    <ArrowUpIcon className="h-4 w-4" />
                ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                ))}
            {children}
        </button>
    );
}
