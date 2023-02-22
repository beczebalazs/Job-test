import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="fixed flex top-0 left-0 right-0 h-16 bg-rich-black shadow-md backdrop-blur-md z-50">
            <nav className="ml-8 flex items-center gap-x-16 text-white mr-auto text-xl font-medium max-sm:text-sm max-sm:gap-x-10 ">
                <Link to="/rent" className="hover:text-ash-gray">
                    Rent a House
                </Link>
                <Link to="/favorite" className="hover:text-ash-gray">
                    Favorite
                </Link>
                <Link to="/login" className="hover:text-ash-gray">
                    Login
                </Link>
            </nav>
        </div>
    );
}
