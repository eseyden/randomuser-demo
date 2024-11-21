import axios from "axios";

export default async function fetchUsers(dispatch, signal) {
    dispatch({ type: "FETCH_START" });
    try {
        let page = 1;
        let totalPages;

        do {
            const response = await axios.get(`/api/random-users?page=${page}`, {
                signal,
            });

            const data = response.data;
            totalPages = data.last_page;
            const loadingPercentage = Math.round((page / totalPages) * 100);

            dispatch({
                type: "LOAD_USERS",
                users: data.data,
                loadingPercentage: loadingPercentage,
            });

            page++;
        } while (page <= totalPages);

        dispatch({ type: "FETCH_END" });
    } catch (error) {
        if (!axios.isCancel(error)) {
            dispatch({
                type: "FETCH_ERROR",
                error: error.message,
            });
        }
    }
}
