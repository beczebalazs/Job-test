import { FC, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./appGuard";
import { routes } from "./routes";
import LoadingScreen from "../components/common/loading-screen";
import { v4 as uuid } from "uuid";

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    {routes.map(({ isIndex, path, page: Page }) => (
                        <Route
                            key={uuid()}
                            index={isIndex}
                            path={path}
                            element={
                                <Suspense fallback={<LoadingScreen />}>
                                    <Page />
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
