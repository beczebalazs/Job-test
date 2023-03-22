import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./store";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

import Navbar from "./components/common/navbar";
import FavouritesPage from "./pages/favourites";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RentPage from "./pages/rent";
import RentDetailPage from "./pages/rent/[rentID]";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div>
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        <main className="mt-16">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Navigate replace to="/rent" />}
                                />
                                <Route path="/rent" element={<RentPage />} />
                                <Route
                                    path="/rent/:id"
                                    element={<RentDetailPage />}
                                />
                                <Route path="/login" element={<LoginPage />} />
                                <Route
                                    path="/favorites"
                                    element={<FavouritesPage />}
                                />
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                            </Routes>
                        </main>
                    </ThemeProvider>
                </div>
            </PersistGate>
        </Provider>
    );
};

export default App;
