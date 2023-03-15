import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectAllRealEstates } from "../../real-estates-store/realEstates.selector";
import { fetchRealEstates } from "../../real-estates-store/realEstates.action";
import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { AsyncDispatch } from "../../store";

import RentCard from "./components/rent-card/RentCard";
import Typography from "@mui/material/Typography";
import PropertySearchbar from "./components/searchbars/PropertySearchbar";
import TextCheckboxFilter from "../filters/TextCheckboxFilter";
import CheckboxFilter from "../filters/CheckboxFilter";
import CircularProgress from "@mui/material/CircularProgress";

export default function Rent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const itemsPerPage = 15;

    const dispatch: AsyncDispatch = useDispatch();

    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);

    const priceValues = queryParams.getAll("Price");
    const cityValues = queryParams.getAll("City");
    const regionValues = queryParams.getAll("Region");

    useEffect(() => {
        setLoading(true);
        dispatch(fetchRealEstates()).then(() => setLoading(false));
    }, [dispatch]);

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
                <Box sx={{ mx: 20, pt: 10 }}>
                    <Grid container>
                        <Grid item md={2} />
                        <Grid item md={10}>
                            <Typography
                                sx={{ fontWeight: 700, fontSize: "2.25rem" }}
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
                            <div className="pt-6 flex ">
                                <PropertySearchbar
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </Grid>
                        <Grid item md={2} sx={{ pt: 2, pr: 4 }}>
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
                        <Grid
                            container
                            md={10}
                            sx={{ pt: 2, pb: 4 }}
                            spacing={3}
                        >
                            {filteredData
                                .slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                )
                                .map((data) => (
                                    <Grid item md={4}>
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
