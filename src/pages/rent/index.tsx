import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";

import FooterPagination from "../../components/common/footer-pagination";
import LoadingScreen from "../../components/common/loading-screen";
import PropertySearchbar from "../../components/common/property-search-bar";
import RentCard from "../../components/common/rent-card";
import { RentFilters } from "../../components/rent/rent-filters/RentFilters";
import { RentModal } from "../../components/rent/rent-modal/RentModal";
import { fetchRealEstates } from "../../service/realEstates.service";
import { AsyncDispatch } from "../../store";
import { selectAllRealEstates } from "../../store/real-estates/realEstates.selector";

const RentPage: FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch: AsyncDispatch = useDispatch();
    const theme = useTheme();
    const { search } = useLocation();

    const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

    const itemsPerPage = 15;

    const realEstates = useSelector(selectAllRealEstates);

    const queryParams = new URLSearchParams(search);

    const priceValues = queryParams.getAll("Price");
    const cityValues = queryParams.getAll("City");
    const regionValues = queryParams.getAll("Region");

    useEffect(() => {
        setLoading(true);
        dispatch(fetchRealEstates()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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

    const filteredData = realEstates.filter((item) => {
        const matchesSearchTerm =
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice =
            priceValues.length === 0 ||
            priceValues.some((price) => {
                if (price.includes("+")) {
                    const minPrice = Number(price.replace("+", ""));
                    return Number(item.price) >= minPrice;
                } else {
                    const [minPrice, maxPrice] = price.split("-").map(Number);
                    return (
                        Number(item.price) >= minPrice &&
                        Number(item.price) <= maxPrice
                    );
                }
            });

        const matchesCity =
            cityValues.length === 0 || cityValues.includes(item.city);
        const matchesRegion =
            regionValues.length === 0 || regionValues.includes(item.region);

        return (
            matchesSearchTerm && matchesPrice && matchesCity && matchesRegion
        );
    });

    if (loading) {
        return <LoadingScreen />;
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
                                Rent a house
                            </Typography>
                            <Typography
                                sx={{
                                    pl: 0.2,
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                }}
                            >
                                {filteredData.length} results
                            </Typography>
                            {isMdScreen && (
                                <div className="pt-6 flex max-sm:w-9/12">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            width: "100%",
                                            border: "1px solid grey",
                                            backgroundColor: "#fff",
                                            color: "black",
                                        }}
                                        onClick={handleOpenModal}
                                    >
                                        Filters
                                    </Button>
                                    <RentModal
                                        handleCloseModal={handleCloseModal}
                                        isModalOpen={isModalOpen}
                                    />
                                </div>
                            )}
                            <div className="pt-6 flex max-sm:w-9/12">
                                <PropertySearchbar
                                    onChange={handleSearchChange}
                                    value={searchTerm}
                                    placeholder="Search..."
                                />
                            </div>
                        </Grid>
                        {!isMdScreen && (
                            <Grid
                                item
                                md={3}
                                lg={3}
                                xl={2}
                                sx={{ pt: 2, pr: 4 }}
                            >
                                <RentFilters />
                            </Grid>
                        )}
                        <Grid
                            container
                            md={9}
                            lg={9}
                            xl={10}
                            sx={{ pt: 2, pb: 4 }}
                            spacing={3}
                        >
                            {filteredData
                                .slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                )
                                .map((data) => (
                                    <Grid item xs={12} sm={6} md={6} lg={4}>
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
    }
};

export default RentPage;
