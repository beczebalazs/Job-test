import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Rent from "./components/rent/Rent";
import RentDetail from "./components/rent-detail/RentDetail";
import Login from "./components/login/Login";

function App() {
    return (
        <div>
            <Navbar />
            <main className="mt-16">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<Rent />} />
                    <Route path="/rent-detail/:id" element={<RentDetail />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
