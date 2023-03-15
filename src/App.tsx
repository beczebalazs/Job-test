import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";

import Favourites from "./components/favourites/Favourites";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import RentDetail from "./components/rent-detail/RentDetail";
import Rent from "./components/rent/Rent";

function App() {
    return (
        <Provider store={store}>
            <div>
                <ThemeProvider theme={theme}>
                    <Navbar />
                    <main className="mt-16">
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/rent" element={<Rent />} />
                            <Route
                                path="/rent-detail/:id"
                                element={<RentDetail />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/favorites" element={<Favourites />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                </ThemeProvider>
            </div>
        </Provider>
    );
}

export default App;
