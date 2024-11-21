/**
 * BirthDayOccurrence.JSX
 *
 * Displays notice of impending birthday occurrence
 *
 */

// date-fns is the new Moment.js
import {
    differenceInDays,
    isFuture,
    isPast,
    isToday,
    parse,
    setYear,
} from "date-fns";

export default function BirthDayOccurrence({ birthday }) {
    const baseClassNames =
        "rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";

    // When is the birthday this year?
    const birthdayDate = setYear(
        parse(birthday, "yyyy-MM-dd", new Date()),
        new Date().getFullYear(),
    );

    if (isToday(birthdayDate)) {
        return (
            <div
                className={
                    baseClassNames +
                    "text-green-700 dark:text-green-50 bg-green-50 dark:bg-green-900 ring-green-50/20 dark:ring-green-200/20"
                }
            >
                Is today!
            </div>
        );
    }
    if (isPast(birthdayDate)) {
        return (
            <div
                className={
                    baseClassNames +
                    "text-gray-600 dark:text-white bg-gray-50 dark:bg-gray-800 ring-gray-500/10 dark:ring-gray-300/20"
                }
            >
                Already happened this year.
            </div>
        );
    }
    if (isFuture(birthdayDate)) {
        const daysUntil = differenceInDays(birthdayDate, new Date()); // Countdown until birthday for fun
        return (
            <div
                className={
                    baseClassNames +
                    "text-orange-700 bg-orange-50 dark:text-orange-50 dark:bg-orange-800 ring-orange-600/10 dark:ring-orange-100/20"
                }
            >
                {daysUntil} days until birthday.
            </div>
        );
    }
}
