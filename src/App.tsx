import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import Rent from "./components/rent/Rent";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/rent");
    }, []);

    return (
        <div>
            <Navbar />
            <main>
                <Routes>
                    <Route index path="/rent" element={<Rent />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
