/**
 * App.JSX
 *
 * React Application Scaffolding
 *
 */
import { Navbar, NavbarLabel } from "./Components/Navbar.jsx";
import { StackedLayout } from "./Components/StackedLayout.jsx";
import { Logo } from "@js/Components/Logo.jsx";
import { Link } from "@js/Components/Link.jsx";
import RandomUsersProvider from "@js/Providers/RandomUsersProvider.jsx";
import UserList from "@/Components/UserList.jsx";

function App() {
    // Stacked layout for a responsive application container & navigation
    return (
        <StackedLayout
            navbar={
                <Navbar>
                    <Link href="/" aria-label="Home">
                        <Logo className="size-10 sm:size-8" />
                    </Link>
                    <NavbarLabel>Random User Demo</NavbarLabel>
                </Navbar>
            }
            disableSidebar={true}
        >
            {/* Create app state to prevent prop drilling */}
            <RandomUsersProvider>
                <UserList />
            </RandomUsersProvider>
        </StackedLayout>
    );
}

export default App;
