/**
 * RandomUsersProvider.JSX
 *
 * Creates two contexts for component use and handles initial fetch of data.
 *
 */
import { createContext, useEffect, useReducer, useRef } from "react";
import { initialState, usersReducer } from "./randomusersReducer.js";
import fetchUsers from "./fetchRandomUsers.js";

export const RandomUsersContext = createContext(null);
export const RandomUsersDispatchContext = createContext(null);

export default function RandomUsersProvider({ children }) {
    // Create reducer for handling app state changes
    const [state, dispatch] = useReducer(usersReducer, initialState);

    // Keep track of if data has been fetched
    const fetchUsersRef = useRef(false);

    useEffect(() => {
        /*
         React Strict Mode changed to double mount components
         since I last used it; this was required to prevent hitting the API twice.

         I probably would implement caching and better handling of this
         in a non-demo app due to these new recommendations.
         It would be nice for all context consumers to ask the provider
         to load data when needed rather than it being global.

         https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-double-rendering-in-development
         https://react.dev/learn/synchronizing-with-effects
         */
        if (!fetchUsersRef.current) {
            fetchUsersRef.current = true;
            (async () => {
                await fetchUsers(dispatch);
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
