import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Rent from "./components/rent/Rent";
import RentDetail from "./components/rent-detail/RentDetail";
import RentPage from "./pages/rent/RentPage";
import LoginPage from "./pages/login/LoginPage";

function App() {
    return (
        <div>
            <Navbar />
            <main className="mt-16">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/rent-detail/:id" element={<RentDetail />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
