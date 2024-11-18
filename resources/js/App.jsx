import {
    Navbar,
    NavbarDivider,
    NavbarItem,
    NavbarLabel,
    NavbarSection,
} from "./Components/Navbar.jsx";
import { StackedLayout } from "./Components/StackedLayout.jsx";
import { Logo } from "@js/Components/Logo.jsx";
import { Link } from "@js/Components/Link.jsx";

function App() {
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
            <h1>Hello World</h1>
        </StackedLayout>
    );
}

function NavigationItems() {
    return (
        <>
            <NavbarDivider />
            <NavbarSection>
                <NavbarItem href="/" current>
                    Home
                </NavbarItem>
            </NavbarSection>
        </>
    );
}

export default App;
