import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="fixed flex top-0 left-0 right-0 h-16 bg-white backdrop-blur-md z-50 shadow-2xl">
            <nav className="ml-5 flex items-center gap-x-16 text-gray mr-auto text-xl font-medium max-sm:text-sm max-sm:gap-x-10 ">
                <Link to="/" className="hover:text-midnight-green">
                    Home
                </Link>
                <Link to="/rent" className="hover:text-midnight-green">
                    Rent a House
                </Link>
                <Link to="/favorite" className="hover:text-midnight-green">
                    Favorite
                </Link>
                <Link to="/login" className="hover:text-midnight-green">
                    Login
                </Link>
            </nav>
        </div>
    );
}
