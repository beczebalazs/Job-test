import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import RentPage from "./pages/rent/RentPage";
import RentDetailPage from "./pages/rent-detail/RentDetailPage";
import Home from "./components/home/Home";

function App() {
    return (
        <div>
            <Navbar />
            <main className="mt-16">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/rent" element={<RentPage />} />
                    <Route path="/rent-detail" element={<RentDetailPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
