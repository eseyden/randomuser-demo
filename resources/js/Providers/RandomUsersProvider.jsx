import { createContext, useEffect, useReducer, useRef } from "react";
import { initialState, usersReducer } from "./randomusersReducer.js";
import fetchUsers from "./fetchRandomUsers.js";

export const RandomUsersContext = createContext(null);
export const RandomUsersDispatchContext = createContext(null);

export default function RandomUsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    const fetchUsersRef = useRef(false);

    useEffect(() => {
        const abortController = new AbortController();
        if (!fetchUsersRef.current) {
            fetchUsersRef.current = true;
            (async () => {
                await fetchUsers(dispatch, abortController.signal);
            })();
        }
    }, []);

    return (
        <RandomUsersContext.Provider value={state}>
            <RandomUsersDispatchContext.Provider value={dispatch}>
                {children}
            </RandomUsersDispatchContext.Provider>
        </RandomUsersContext.Provider>
    );
}
