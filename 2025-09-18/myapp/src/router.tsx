import { createHashRouter, RouterProvider, Outlet, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

function Layout() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/profile">
                        Profile
                    </Button>
                    <Button color="inherit" component={Link} to="/contact">
                        Contact
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </Box>
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
