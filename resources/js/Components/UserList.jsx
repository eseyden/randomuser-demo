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
            <div className="flex flex-row gap-3 items-center mb-4">
                <SortButton sortKey="first_name">Sort by First Name</SortButton>
                <SortButton sortKey="last_name">Sort by Last Name</SortButton>
                <SortButton sortKey="birthday">Sort by Birthday</SortButton>
                <SortButton sortKey="age">Sort by Age</SortButton>
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
