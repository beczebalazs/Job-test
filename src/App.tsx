import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Rent from "./components/rent/Rent";
import RentDetail from "./components/rent-detail/RentDetail";
import Login from "./components/login/Login";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Favourites from "./components/favourites/Favourites";
import { Provider } from "react-redux";
import { store } from "./store";

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
                        </Routes>
                    </main>
                </ThemeProvider>
            </div>
        </Provider>
    );
}

export default App;
