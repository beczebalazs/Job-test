import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import RentPage from "./pages/rent/RentPage";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/rent");
    }, []);

    return (
        <div>
            <Navbar />
            <main className="mt-16">
                <Routes>
                    <Route index path="/rent" element={<RentPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
