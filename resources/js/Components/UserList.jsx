import { useContext, useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid/index.js";
import { RandomUsersContext } from "../Providers/RandomUsersProvider.jsx";

import BirthDayOccurrence from "@/Components/BirthDayOccurrence.jsx";
import Pagination from "./Pagination.jsx";
import SortButton from "./SortButton.jsx";

export default function UserList() {
    const state = useContext(RandomUsersContext);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9; // Number of users per page

    useEffect(() => {
        setCurrentPage(1);
    }, [state.sort, state.sortDirection]);

    if (!state.users) return null;
    if (state.loading)
        return (
            <div className="flex items-center justify-center">
                Loading...{state.loadingPercentage}%
                <ArrowPathIcon className={"animate-spin h-5 w-5 ml-3"} />
            </div>
        );

    const totalPages = Math.ceil(state.users.length / usersPerPage);

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const currentUsers = state.users.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex flex-col">
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

function UserListItem({ user }) {
    return (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-3 bg-gray dark:bg-gray-700 dark:text-gray-200">
                <div className="text-sm/6 font-medium text-gray-900 dark:text-gray-100">
                    {user.first_name} {user.last_name}
                </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-3 py-2 text-sm/6">
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-100">
                        Birthday
                    </dt>
                    <dd className="text-gray-700 dark:text-gray-100">
                        {user.birthday}
                    </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500 dark:text-gray-100">
                        Occurrence
                    </dt>
                    <dd className="flex items-start gap-x-2">
                        <BirthDayOccurrence birthday={user.birthday} />
                    </dd>
                </div>
            </dl>
        </li>
    );
}
