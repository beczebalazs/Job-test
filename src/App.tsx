import { Routes, Route, Navigate } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

import Navbar from "./components/navbar/Navbar";
import Rent from "./components/rent/Rent";
import RentDetail from "./components/rent-detail/RentDetail";
import Login from "./components/login/Login";
import Favourites from "./components/favourites/Favourites";

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
                            </Routes>
                        </main>
                    </ThemeProvider>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
