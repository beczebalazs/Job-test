import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { authTokenSelect } from "../store/auth/auth.selector";

const ProtectedRoute: FC = () => {
    const authToken = useSelector(authTokenSelect);
    const location = useLocation();

    switch (location.pathname) {
        case "/profile":
            if (authToken !== null) return <Outlet />;
            else return <Navigate to="/login" />;
        default:
            return <Outlet />;
    }
};

export default ProtectedRoute;
