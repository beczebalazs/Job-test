import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Button, Divider, Grid, Modal, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";

import CheckboxFilter from "../../components/common/filters/checkbox-filter/CheckboxFilter";
import TextCheckboxFilter from "../../components/common/filters/text-checkbox-filter/TextCheckboxFilter";
import PropertySearchbar from "../../components/common/property-search-bar/PropertySearchbar";
import RentCard from "../../components/common/rent-card/RentCard";
import { fetchRealEstates } from "../../service/realEstates.service";
import { AsyncDispatch } from "../../store";
import { selectAllRealEstates } from "../../store/real-estates/realEstates.selector";

export default function RentPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

    const itemsPerPage = 15;

    const dispatch: AsyncDispatch = useDispatch();

    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);

    const priceValues = queryParams.getAll("Price");
    const cityValues = queryParams.getAll("City");
    const regionValues = queryParams.getAll("Region");

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        dispatch(fetchRealEstates()).then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const realEstates = useSelector(selectAllRealEstates);

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
                                Rent a house
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    pl: 0.2,
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
                                            color: "black",
                                            border: "1px solid grey",
                                            backgroundColor: "#fff",
                                        }}
                                        onClick={handleOpenModal}
                                    >
                                        Filters
                                    </Button>
                                    <Modal
                                        open={isModalOpen}
                                        onClose={handleCloseModal}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: "#fff",
                                                width: "80vw",
                                                maxHeight: "80vh",
                                                overflowY: "auto",
                                                padding: "30px",
                                                position: "relative",
                                            }}
                                        >
                                            <Grid
                                                item
                                                md={3}
                                                lg={3}
                                                xl={2}
                                                sx={{ pb: 2 }}
                                            >
                                                <div className="pb-5">
                                                    <CheckboxFilter
                                                        title="Price"
                                                        options={[
                                                            "1-100",
                                                            "100-200",
                                                            "300-400",
                                                            "400-500",
                                                            "500+",
                                                        ]}
                                                    />
                                                </div>
                                                <Divider sx={{ mb: 2 }} />
                                                <div className="pb-5">
                                                    <TextCheckboxFilter
                                                        title="City"
                                                        options={[
                                                            "Targu Mures",
                                                            "Gheorgheni",
                                                            "Brasov",
                                                            "Cluj Napoca",
                                                            "Miercurea Ciuc",
                                                            "Sovata",
                                                            "Bucuresti",
                                                            "Tusnádfürdő",
                                                            "Marosfő",
                                                        ]}
                                                    />
                                                </div>
                                                <Divider sx={{ mb: 2 }} />
                                                <div>
                                                    <TextCheckboxFilter
                                                        title="Region"
                                                        options={[
                                                            "HR",
                                                            "MS",
                                                            "CV",
                                                            "BV",
                                                            "CJ",
                                                            "B",
                                                        ]}
                                                    />
                                                </div>
                                                <button
                                                    className="absolute top-0 right-0 m-2 text-gray font-bold text-xl"
                                                    onClick={handleCloseModal}
                                                >
                                                    X
                                                </button>
                                            </Grid>
                                        </Box>
                                    </Modal>
                                </div>
                            )}
                            <div className="pt-6 flex max-sm:w-9/12">
                                <PropertySearchbar
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
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
                                <div className="pb-5">
                                    <CheckboxFilter
                                        title="Price"
                                        options={[
                                            "1-100",
                                            "100-200",
                                            "300-400",
                                            "400-500",
                                            "500+",
                                        ]}
                                    />
                                </div>
                                <div className="pb-5">
                                    <TextCheckboxFilter
                                        title="City"
                                        options={[
                                            "Targu Mures",
                                            "Gheorgheni",
                                            "Brasov",
                                            "Cluj Napoca",
                                            "Miercurea Ciuc",
                                            "Sovata",
                                            "Bucuresti",
                                            "Tusnádfürdő",
                                            "Marosfő",
                                        ]}
                                    />
                                </div>
                                <div>
                                    <TextCheckboxFilter
                                        title="Region"
                                        options={[
                                            "HR",
                                            "MS",
                                            "CV",
                                            "BV",
                                            "CJ",
                                            "B",
                                        ]}
                                    />
                                </div>
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
