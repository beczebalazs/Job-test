import { Button, CardActionArea, CardActions } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import ReadMoreIcon from "@mui/icons-material/ReadMore";

interface CardsPropsType {
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
}

export default function RentCard(props: CardsPropsType) {
    const {
        image,
        title,
        description,
        price,
        region,
        city,
        address,
        comission,
    } = props;

    return (
        <Card
            sx={{
                maxWidth: 450,
                height: "100%",
                pb: 1,
                backgroundColor: "#124559",
            }}
        >
            <CardActionArea>
                {image !== undefined && (
                    <CardMedia
                        component="img"
                        height="345"
                        image={image}
                        alt="Image"
                        sx={{ objectFit: "cover" }}
                    />
                )}

                <CardContent>
                    <Typography
                        gutterBottom
                        color="white"
                        variant="h5"
                        component="div"
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {description.slice(0, 50)}...
                    </Typography>
                    <Typography variant="body2" color="white">
                        Price: {price} $ / month
                    </Typography>
                    {comission !== undefined && (
                        <Typography variant="body2" color="white">
                            Comission: {comission} $
                        </Typography>
                    )}
                    <Typography variant="body2" color="white">
                        {region}, {city}, {address}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    endIcon={<ReadMoreIcon />}
                    color="primary"
                    sx={{
                        color: "white",
                        backgroundColor: "black",
                        border: "none",
                        "&:hover": {
                            backgroundColor: "gray",
                            color: "white",
                            border: "none",
                        },
                    }}
                >
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
