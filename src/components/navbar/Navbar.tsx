import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedSelector";
import companyLogo from "../../images/company-logo.png";
import { RootState } from "../../store";
import { Avatar } from "@mui/material";


export default function Navbar() {
    const authToken = useAppSelector(
        (state: RootState) => state.auth.userToken
    );

    return (
        <div className="fixed top-0 left-0 right-0 h-30 bg-white backdrop-blur-md z-50 shadow-2xl">
            <nav className="ml-5 font-semibold text-xl flex items-center">
                <div className="flex items-center gap-x-14 mr-auto">
                    <Link to="/" className="hover:text-midnight-green">
                        <img
                            src={companyLogo}
                            className="h-20"
                            alt="Company logo"
                        />
                    </Link>
                    <Link to="/rent" className="hover:text-gray">
                        Rent a House
                    </Link>
                    <Link to="/favorites" className="hover:text-gray">
                        Favorite
                    </Link>
                </div>
                <div className="flex items-center mr-16">
                    {authToken === null ? (
                        <Link to="/login" className="hover:text-gray ">
                            Login
                        </Link>
                    ) : (
                        <Avatar src="../../images/profile-picture.webp"/>
                    )}
                </div>
            </nav>
        </div>
    );
}
