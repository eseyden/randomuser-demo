import { useContext } from "react";
import { RandomUsersContext } from "../Providers/RandomUsersProvider.jsx";

export default function UserList() {
    const state = useContext(RandomUsersContext);
    return (
        <ul>
            {state.users
                ? state.users.map((user) => (
                      <UserListItem key={user.id} user={user} />
                  ))
                : ""}
        </ul>
    );
}

function UserListItem({ user }) {
    return <li>Hello {user.first_name}</li>;
}
