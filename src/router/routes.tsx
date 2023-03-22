import { lazy } from "react";
import { Navigate } from "react-router-dom";

const routes = [
    { isIndex: true, page: () => <Navigate to="/rent" /> },
    { path: "/rent", page: lazy(() => import("../pages/rent")) },
    { path: "/rent/:id", page: lazy(() => import("../pages/rent/[rentID]")) },
    { path: "/favorites", page: lazy(() => import("../pages/favourites")) },
    { path: "/login", page: lazy(() => import("../pages/login")) },
    { path: "/profile", page: lazy(() => import("../pages/profile")) },
    { path: "*", page: lazy(() => import("../pages/not-found")) },
];

export { routes };
