import { useState, useRef, MouseEvent } from "react";
import { useParams } from "react-router-dom";

import { Grid } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

//MOCKdata
import { MockData, MockDataPropsType } from "../../mock-data/MockData";

export default function RentDetail() {
    const [isImageOpen, setIsImageOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { id } = useParams<{ id: string }>();

    function getPropertyById(id: number): MockDataPropsType | undefined {
        return MockData.find((property) => property.id === id);
    }

    let property;
    if (id) {
        const parsedId = parseInt(id);
        property = getPropertyById(parsedId);
    }

    if (!property) {
        return <div>Property not found</div>;
    }

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
                        {property.title}
                    </h1>
                </div>
            </header>
            <Grid container className="p-10" spacing={4}>
                <Grid item xs={12} sm={12} md={12} lg={9}>
                    {property.image !== undefined && (
                        <img
                            src={property.image}
                            alt="House"
                            onClick={handleImageClick}
                            className="cursor-pointer"
                        ></img>
                    )}
                    {isImageOpen && (
                        <div
                            className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center z-10"
                            onClick={handleOutsideClick}
                        >
                            <div
                                ref={modalRef}
                                className="relative m-auto max-w-[70vw] max-h-[80vh]"
                            >
                                <img
                                    className="max-w-full max-h-full"
                                    src={property.image}
                                    alt="House"
                                ></img>
                                <button
                                    className="absolute top-0 right-0 m-4 text-white font-bold text-xl"
                                    onClick={handleCloseModal}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    )}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={3}>
                    <Card
                        sx={{
                            minWidth: 275,
                            backgroundColor: "#124559",
                            marginBottom: 3,
                        }}
                    >
                        <CardContent sx={{ color: "white" }}>
                            <h2 className="text-xl font-medium mb-2 underline">
                                House description
                            </h2>
                            <p>{property.description}</p>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            minWidth: 275,
                            backgroundColor: "#124559",
                            marginBottom: 3,
                        }}
                    >
                        <CardContent sx={{ color: "white" }}>
                            <h2 className="text-xl font-medium mb-2 underline">
                                Price and Location
                            </h2>
                            <ul>
                                <li>
                                    <b>Price:</b> {property.price} $ / month
                                </li>
                                {property.comission !== undefined && (
                                    <li>
                                        <b>Comission:</b> {property.comission} $
                                    </li>
                                )}
                                <li>
                                    <b>Region:</b> {property.region}
                                </li>
                                <li>
                                    <b>City:</b> {property.city}
                                </li>
                                <li>
                                    <b>Address:</b> {property.address}
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            minWidth: 275,
                            backgroundColor: "#124559",
                        }}
                    >
                        <CardContent sx={{ color: "white" }}>
                            <h2 className="text-xl font-medium mb-2 underline">
                                Contact details
                            </h2>
                            <p>
                                <PhoneIcon />{" "}
                                <a
                                    className="text-white italic font-medium"
                                    href={`tel:${property.phone}`}
                                >
                                    {property.phone}
                                </a>
                            </p>
                            <p>
                                <EmailIcon />{" "}
                                <a
                                    className="text-white italic font-medium"
                                    href={`mailto:${property.email}`}
                                >
                                    {property.email}
                                </a>
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
