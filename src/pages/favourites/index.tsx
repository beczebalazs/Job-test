import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import PropertySearchbar from "../../components/common/property-search-bar/PropertySearchbar";
import RentCard from "../../components/common/rent-card/RentCard";
import { fetchRealEstates } from "../../service/realEstates.service";
import { AsyncDispatch } from "../../store";
import { selectFavorites } from "../../store/favourites/favourites.selector";
import { selectAllRealEstates } from "../../store/real-estates/realEstates.selector";

export default function FavouritesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const favorite = useSelector(selectFavorites);

    const itemsPerPage = 15;

    const dispatch: AsyncDispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        dispatch(fetchRealEstates()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const realEstates = useSelector(selectAllRealEstates);

    const favoriteRealEstates = realEstates.filter((realEstate) =>
        favorite.includes(realEstate.id)
    );

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = favoriteRealEstates.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircularProgress
                    sx={{
                        color: "gray",
                    }}
                ></CircularProgress>
            </div>
        );
    } else {
        return (
            <div>
                <Box
                    sx={{
                        mx: { xs: 4, md: 8, xl: 20 },
                        pt: { xs: 2, md: 4, xl: 10 },
                    }}
                >
                    <Grid container>
                        <Grid item md={12}>
                            <Typography
                                sx={{ fontWeight: 700, fontSize: "2rem" }}
                            >
                                Favourites
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    pl: 0.2,
                                }}
                            >
                                {filteredData.length} favorites
                            </Typography>
                            <div className="pt-6 flex max-sm:w-9/12">
                                <PropertySearchbar
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </Grid>
                        <Grid
                            container
                            md={12}
                            xs={12}
                            sx={{ pt: 2, pb: 4 }}
                            spacing={3}
                        >
                            {filteredData
                                .slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                )
                                .map((data) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <RentCard
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            description={data.description}
                                            price={data.price}
                                            region={data.region}
                                            city={data.city}
                                            address={data.address}
                                            image={data.image}
                                            comission={data.comission}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                    <Pagination
                        count={Math.ceil(filteredData.length / itemsPerPage)}
                        page={currentPage}
                        shape="rounded"
                        onChange={handlePageChange}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            my: 5,
                        }}
                    />
                </Box>
            </div>
        );
    }
}
