import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

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
    const { image, title, price, region, city, address, id } = props;

    const navigate = useNavigate();

    function handleReadMoreClick() {
        navigate(`/rent-detail/${id}`);
    }

    return (
        <div className="hover:cursor-pointer">
            <Paper
                elevation={8}
                sx={{
                    display: "flex",
                    px: 2.8,
                    pt: 2,
                    flexDirection: "column",
                    borderRadius: "5px",
                }}
                onClick={handleReadMoreClick}
            >
                {image !== undefined && (
                    <img src={image} alt="" className="rounded" />
                )}
                <Grid sx={{ pt: 1 }}>
                    <div>
                        <Typography
                            sx={{ fontWeight: 500, fontSize: "1.5rem" }}
                        >
                            {title}
                        </Typography>
                        <Typography sx={{ fontWeight: 300, lineHeight: 1 }}>
                            {region}, {city}, {address}
                        </Typography>
                    </div>
                    <div className="pt-6 pb-2 flex justify-between">
                        <Typography
                            sx={{ fontWeight: 800, fontSize: "1.8rem" }}
                        >
                            {price} € / month
                        </Typography>
                        <div>
                            <StarBorderOutlinedIcon
                                sx={{ fontSize: "2.8rem" }}
                            />
                        </div>
                    </div>
                </Grid>
            </Paper>
        </div>
    );
}
