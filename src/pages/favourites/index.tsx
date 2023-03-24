import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

import FooterPagination from "@components/common/footer-pagination";
import Navbar from "../../components/common/navbar";
import PropertySearchbar from "../../components/common/property-search-bar";
import RentCard from "../../components/common/rent-card";
import { fetchRealEstates } from "../../service/realEstates.service";
import { AsyncDispatch } from "../../store";
import { selectFavorites } from "../../store/favourites/favourites.selector";
import { selectAllRealEstates } from "../../store/real-estates/realEstates.selector";

const FavouritesPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const favorite = useSelector(selectFavorites);
    const dispatch: AsyncDispatch = useDispatch();
    const realEstates = useSelector(selectAllRealEstates);

    const itemsPerPage = 15;

    useEffect(() => {
        dispatch(fetchRealEstates());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const favoriteRealEstates = realEstates.filter((realEstate) =>
        favorite.includes(realEstate.id)
    );

    const filteredData = favoriteRealEstates.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    mx: { xs: 4, md: 8, xl: 20 },
                    pt: { xs: 2, md: 4, xl: 10 },
                }}
            >
                <Grid container>
                    <Grid item md={12}>
                        <Typography sx={{ fontWeight: 700, fontSize: "2rem" }}>
                            Favourites
                        </Typography>
                        <Typography
                            sx={{
                                pl: 0.2,
                                fontWeight: 500,
                                fontSize: "1rem",
                            }}
                        >
                            {filteredData.length} favorites
                        </Typography>
                        <div className="pt-6 flex max-sm:w-9/12">
                            <PropertySearchbar
                                onChange={handleSearchChange}
                                value={searchTerm}
                                placeholder="Search..."
                            />
                        </div>
                    </Grid>
                    <Grid
                        container
                        item
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
                                <Grid
                                    key={uuid()}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                >
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
                <FooterPagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    dataLength={filteredData.length}
                    itemsPerPage={itemsPerPage}
                />
            </Box>
        </div>
    );
};

export default FavouritesPage;
