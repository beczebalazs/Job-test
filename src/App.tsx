import { Navigate, Route, Routes } from "react-router-dom";

import ReduxStoreProvider from "./providers/storeProvider";
import CustomThemeProvider from "./providers/themeProvider";

import Navbar from "./components/common/navbar";
import FavouritesPage from "./pages/favourites";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RentPage from "./pages/rent";
import RentDetailPage from "./pages/rent/[rentID]";

const App = () => {
    return (
        <ReduxStoreProvider>
            <CustomThemeProvider>
                <Navbar />
                <main className="mt-16">
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/rent" />}
                        />
                        <Route path="/rent" element={<RentPage />} />
                        <Route path="/rent/:id" element={<RentDetailPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/favorites" element={<FavouritesPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </main>
            </CustomThemeProvider>
        </ReduxStoreProvider>
    );
};

export default App;
