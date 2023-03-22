import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { selectFavorites } from "../../../store/favourites/favourites.selector";
import {
    addFavorite,
    removeFavorite,
} from "../../../store/favourites/favourites.slice";

interface Props {
    id: string;
    image?: string;
    title: string;
    description: string;
    price: number;
    region: string;
    city: string;
    address: string;
    comission?: number;
    phone?: number;
    email?: string;
}

export const RentCard: FC<Props> = (props) => {
    const { image, title, price, city, address, id } = props;

    const dispatch = useDispatch();

    const favorite = useSelector(selectFavorites);

    const navigate = useNavigate();

    function handleReadMoreClick() {
        navigate(`/rent/${id}`);
    }

    function handleFavoriteClick() {
        const isFavorite = favorite.includes(id);
        if (isFavorite) {
            dispatch(removeFavorite(id));
        } else {
            dispatch(addFavorite(id));
        }
    }

    return (
        <div className="hover:cursor-pointer">
            <Paper
                elevation={8}
                sx={{
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    px: 2.8,
                    pt: 2,
                }}
            >
                {image !== undefined && (
                    <img
                        src={image}
                        alt=""
                        className="rounded h-52"
                        onClick={handleReadMoreClick}
                    />
                )}
                <Grid sx={{ pt: 1 }}>
                    <div>
                        <Typography
                            sx={{ fontWeight: 500, fontSize: "1.3rem" }}
                            onClick={handleReadMoreClick}
                        >
                            {title.substring(0, 16)}...
                        </Typography>
                        <Typography
                            sx={{ fontWeight: 300, lineHeight: 1 }}
                            onClick={handleReadMoreClick}
                        >
                            {city}
                        </Typography>
                        <Typography
                            sx={{ fontWeight: 300, lineHeight: 1 }}
                            onClick={handleReadMoreClick}
                        >
                            {address}
                        </Typography>
                    </div>
                    <div className="pt-6 pb-2 flex justify-between">
                        <Typography
                            sx={{ fontWeight: 800, fontSize: "1.4rem" }}
                            onClick={handleReadMoreClick}
                        >
                            {price}€ / month
                        </Typography>
                        <div>
                            {favorite.includes(id) ? (
                                <StarIcon
                                    sx={{
                                        fontSize: "2rem",
                                        color: "#014783",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleFavoriteClick}
                                />
                            ) : (
                                <StarBorderOutlinedIcon
                                    sx={{
                                        fontSize: "2rem",
                                        color: "gray",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleFavoriteClick}
                                />
                            )}
                        </div>
                    </div>
                </Grid>
            </Paper>
        </div>
    );
};
