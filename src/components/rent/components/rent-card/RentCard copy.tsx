import { useNavigate } from "react-router-dom";

import { CardActionArea } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface CardsPropsType {
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
    id: number;
}

export default function RentCard(props: CardsPropsType) {
    const {
        image,
        title,
        price,
        region,
        city,
        address,
        id,
    } = props;

    const navigate = useNavigate();

    function handleReadMoreClick() {
        navigate(`/rent-detail/${id}`);
    }

    return (
        <Card
            sx={{
                maxWidth: 450,
                height: "100%",
                p: 1.5,
                pb: 0,
                backgroundColor: "white",
                borderRadius: 3,
                border: "2px solid gray",
            }}
        >
            <CardActionArea onClick={handleReadMoreClick}>
                {image !== undefined && (
                    <CardMedia
                        component="img"
                        height="345"
                        image={image}
                        alt="Image"
                        sx={{ objectFit: "cover", borderRadius: 3 }}
                    />
                )}

                <CardContent color="black">
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {region}, {city}, {address}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "bold",
                            fontSize: 25,
                            marginTop: "15px",
                        }}
                    >
                        {price} $ / month
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
