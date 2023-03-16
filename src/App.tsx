import { Navigate, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

import Favourites from "./components/favourites/Favourites";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import RentDetail from "./components/rent-detail/RentDetail";
import Rent from "./components/rent/Rent";
import { theme } from "./theme";
import Profile from "./components/profile/Profile";

function App() {
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
                                <Route path="/rent" element={<Rent />} />
                                <Route
                                    path="/rent/:id"
                                    element={<RentDetail />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/favorites"
                                    element={<Favourites />}
                                />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </main>
                    </ThemeProvider>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
