/**
 * UserList.JSX
 *
 * User list is the main interface for viewing the data set.
 * It handles the pagination window state
 * as to prevent overloading the DOM with large data sets.
 *
 */
import { useContext, useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid/index.js";
import { RandomUsersContext } from "../Providers/RandomUsersProvider.jsx";

import UserListItem from "./UserListItem.jsx";
import Pagination from "./Pagination.jsx";
import SortButton from "./SortButton.jsx";

export default function UserList() {
    const state = useContext(RandomUsersContext); // Load app state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9; // Number of users per page

    useEffect(() => {
        // Whenever sort changes reset current page
        setCurrentPage(1);
    }, [state.sort, state.sortDirection]);

    if (state.loading)
        // Do something nice while data is loading
        return (
            <div className="flex items-center justify-center">
                Loading...{state.loadingPercentage}%
                <ArrowPathIcon className={"animate-spin h-5 w-5 ml-3"} />
            </div>
        );

    // Pagination bookkeeping
    const totalPages = Math.ceil(state.users.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    // Pagination display window
    const currentUsers = state.users.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex flex-col">
            {/* Context reducer makes this easy */}
            <div
                role="group"
                aria-labelledby="sort-options-label"
                className="flex flex-col ml-0 sm:ml-auto max-w-full sm:max-w-fit mb-4 p-4 border rounded-md shadow-md"
            >
                <div
                    id="sort-options-label"
                    className="text-lg font-semibold mb-2"
                >
                    Sort Options
                </div>
                <div className="flex sm:flex-row gap-3 items-center">
                    <SortButton sortKey="first_name">First</SortButton>
                    <SortButton sortKey="last_name">Last</SortButton>
                    <SortButton sortKey="birthday">Birthday</SortButton>
                    <SortButton sortKey="age">Age</SortButton>
                </div>
            </div>

            <ul
                role="list"
                className="grid grid-cols-1 gap-x-3 gap-y-4 lg:grid-cols-3 xl:gap-x-8 pb-6"
            >
                {currentUsers.map((user) => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
