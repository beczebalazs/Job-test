import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 p-5 bg-white/5 shadow-md backdrop-blur-md">
            <nav className="ml-8 flex gap-x-16 mr-auto text-xl font-medium max-sm:text-sm max-sm:gap-x-10">
                <Link to="/rent">Rent a House</Link>
                <Link to="/favorite">Favorite</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
    );
}
