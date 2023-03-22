import Navbar from "../../components/common/navbar";

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl">Page not found...</h1>
            </div>
        </div>
    );
};

export default NotFound;
