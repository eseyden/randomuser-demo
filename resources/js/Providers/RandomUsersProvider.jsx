import axios from "axios";
import { createContext, useEffect, useReducer, useRef } from "react";

export const RandomUsersContext = createContext(null);
export const RandomUsersDispatchContext = createContext(null);

const initialState = {
    users: [],
    loading: false,
    loadingPercentage: 0,
    error: null,
    fetched: false,
};

function usersReducer(state, action) {
    console.log("reducer", state, action);
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_END":
            return { ...state, loading: false, error: null, fetched: true };
        case "LOAD_USERS":
            return {
                ...state,
                users: [...state.users, ...action.users],
                loadingPercentage: action.loadingPercentage,
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export default function RandomUsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    const initialized = useRef(false);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch({ type: "FETCH_START" });
            try {
                let page = 1;
                const abortController = new AbortController();
                let totalPages;

                do {
                    const response = await axios.get(
                        `/api/random-users?page=${page}`,
                        {
                            signal: abortController.signal,
                        },
                    );
                    const data = response.data;
                    totalPages = data.last_page;
                    dispatch({
                        type: "LOAD_USERS",
                        users: data.data,
                        loadingPercentage: Math.round(
                            (page / totalPages) * 100,
                        ),
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
        };

        if (!initialized.current) {
            fetchUsers();
        }

        return () => {
            initialized.current = true;
        };
    }, []);

    return (
        <RandomUsersContext.Provider value={state}>
            <RandomUsersDispatchContext.Provider value={dispatch}>
                {children}
            </RandomUsersDispatchContext.Provider>
        </RandomUsersContext.Provider>
    );
}
