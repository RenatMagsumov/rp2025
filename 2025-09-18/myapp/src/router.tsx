import { createHashRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contact from "./components/Contact";

function Layout() {
    return (
        <div style={{ padding: 16 }}>
            <nav style={{ display: "flex", gap: 12 }}>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "profile", element: <Profile /> },
            { path: "contact", element: <Contact /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
