/**
 * UserListItem.JSX
 *
 * This component handles the display of each user's information
 *
 */

import BirthDayOccurrence from "@/Components/BirthDayOccurrence.jsx";

export default function UserListItem({ user }) {
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
