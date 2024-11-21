/**
 * randomUsersReducer.JS
 *
 * This reducer defines the application state and handles state changes
 *
 */
export const initialState = {
    users: [],
    loading: false,
    loadingPercentage: 0,
    error: null,
    fetched: false,
    sort: null,
    sortDirection: "asc",
};

export function usersReducer(state, action) {
    switch (action.type) {
        // Loading state
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        // Loading finished
        case "FETCH_END":
            return { ...state, loading: false, error: null, fetched: true };
        // Add additional users to store during loading
        case "LOAD_USERS":
            return {
                ...state,
                users: [...state.users, ...action.users],
                loadingPercentage: action.loadingPercentage,
            };
        // Something bad happened, take note
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.error };
        // Sort application data
        case "SORT_USERS":
            // Calculate appropriate sort direction
            const newSortDirection =
                state.sort === action.sort && state.sortDirection === "asc"
                    ? "desc"
                    : "asc";
            // Sort the users according to action's sort type
            const sortedUsers = sortUsers(
                state.users,
                action.sort,
                newSortDirection,
            );

            return {
                ...state,
                users: sortedUsers,
                sort: action.sort,
                sortDirection: newSortDirection,
            };
        // All other action types are no-ops
        default:
            return state;
    }
}

// Sorting algorithm
const sortUsers = (users, sortField, sortDirection) => {
    return users.slice().sort((a, b) => {
        let valueA, valueB;

        if (sortField === "birthday") {
            // Extract MM-DD from YYYY-MM-DD
            valueA = a.birthday.slice(5);
            valueB = b.birthday.slice(5);
        } else if (sortField === "age") {
            valueA = a.birthday;
            valueB = b.birthday;
        } else {
            valueA = a[sortField];
            valueB = b[sortField];
        }

        if (valueA < valueB) {
            return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortDirection === "asc" ? 1 : -1;
        }

        return 0;
    });
};
