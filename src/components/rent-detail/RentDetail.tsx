import { useState, useRef, MouseEvent } from "react";

interface RentDetailPropsType {
    id: number;
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
    phone: number;
    email: string;
}

export default function RentDetail(props: RentDetailPropsType) {
    const {
        id,
        title,
        image,
        description,
        price,
        region,
        city,
        address,
        comission,
        phone,
        email,
    } = props;

    const [isImageOpen, setIsImageOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    function handleImageClick() {
        setIsImageOpen(true);
    }

    function handleCloseModal(event: MouseEvent) {
        setIsImageOpen(false);
    }

    function handleOutsideClick(event: MouseEvent) {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            handleCloseModal(event);
        }
    }

    return (
        <div>
            <header className="p-16 bg-[url('./images/rent-background.jpg')]">
                <div className="bg-white/75 rounded-lg text-center p-5 flex flex-col m-auto w-fit">
                    <h1 className="text-black text-3xl font-medium mb-1">
                        {title}
                    </h1>
                </div>
            </header>
            <div className="m-10">
                <div>
                    <h2 className="text-xl font-medium mb-2 underline">
                        House description
                    </h2>
                    <p>{description}</p>
                </div>
                <div>
                    <h2 className="text-xl font-medium mb-2 underline">
                        More Details
                    </h2>
                    <ul>
                        <li>
                            <b>Price:</b> {price} $ / month
                        </li>
                        <li>
                            <b>Region:</b> {region}
                        </li>
                        <li>
                            <b>City:</b> {city}
                        </li>
                        <li>
                            <b>Address:</b> {address}
                        </li>
                        {comission !== undefined && (
                            <li>
                                <b>Comission:</b> {comission} $
                            </li>
                        )}
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-medium mb-2 underline">
                        Contact details
                    </h2>
                    <p>
                        <b>Phone:</b>{" "}
                        <a
                            className="text-midnight-green font-medium"
                            href={`tel:${phone}`}
                        >
                            {phone}
                        </a>
                    </p>
                    <p>
                        <b>Email:</b>{" "}
                        <a
                            className="text-midnight-green font-medium"
                            href={`mailto:${email}`}
                        >
                            {email}
                        </a>
                    </p>
                </div>
                <div>
                    {image !== undefined && (
                        <div>
                            <h2 className="text-xl font-medium mb-3 underline">
                                Image
                            </h2>
                            <img
                                src={image}
                                alt="House"
                                onClick={handleImageClick}
                                className="cursor-pointer"
                            ></img>
                        </div>
                    )}
                    {isImageOpen && (
                        <div
                            className="fixed top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-90 flex justify-center items-center z-10"
                            onClick={handleOutsideClick}
                        >
                            <div ref={modalRef} className="relative">
                                <img src={image} alt="House"></img>
                                <button
                                    className="absolute top-0 right-0 m-4 text-white font-bold text-xl"
                                    onClick={handleCloseModal}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
