/**
 * fetchRandomUsers.js
 *
 * Function for fetching random user data from the Laravel backend API
 * Handles paginated results for efficiency and progress indication
 *
 */
import axios from "axios";

export default async function fetchUsers(dispatch) {
    dispatch({ type: "FETCH_START" }); // Let the reducer know loading started
    try {
        let page = 1;
        let totalPages;

        do {
            const response = await axios.get(`/api/random-users?page=${page}`);

            const data = response.data;

            // Get pagination length from Laravel's pagination response
            totalPages = data.last_page;

            // Calculate how far we are in loading
            const loadingPercentage = Math.round((page / totalPages) * 100);

            // Dispatch data to reducer
            dispatch({
                type: "LOAD_USERS",
                users: data.data,
                loadingPercentage: loadingPercentage,
            });

            page++;
        } while (page <= totalPages);

        dispatch({ type: "FETCH_END" }); // Let the reducer know loading is finished
    } catch (error) {
        // Send the HTTP error somewhere.
        dispatch({
            type: "FETCH_ERROR",
            error: error.message,
        });
    }
}
