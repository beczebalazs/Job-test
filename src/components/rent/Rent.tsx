import { useState, ChangeEvent } from "react";

import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";

import RentCard from "./components/rent-card/RentCard";
import Typography from "@mui/material/Typography";
import PropertySearchbar from "./components/searchbars/PropertySearchbar";
import TextCheckboxFilter from "../filters/TextCheckboxFilter";
import CheckboxFilter from "../filters/CheckboxFilter";

//Mock data
import { MockData } from "../../mock-data/MockData";

export default function Rent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;

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

    const filteredData = MockData.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            sx={{ fontWeight: 500, fontSize: "1rem", pl: 0.2 }}
                        >
                            More than 1000 results
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
                                    "0 - 100",
                                    "100 - 200",
                                    "300 - 400",
                                    "400 - 500",
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
                                    "Taktahark??ny",
                                    "Cluj-Napoca",
                                    "Miercurea Ciuc",
                                    "Sovata",
                                    "Bucuresti",
                                    "Tusn??df??rd??",
                                    "Marosf??",
                                    "Alfalu",
                                    "Mittudjamen mi",
                                ]}
                            />
                        </div>
                        <div>
                            <TextCheckboxFilter
                                title="Region"
                                options={[
                                    "Harghita",
                                    "Mures",
                                    "Covasna",
                                    "Brasov",
                                    "Braila",
                                    "Ilfov",
                                ]}
                            />
                        </div>
                    </Grid>
                    <Grid container md={10} sx={{ pt: 2, pb: 4 }} spacing={3}>
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
                    sx={{ display: "flex", justifyContent: "center", my: 5 }}
                />
            </Box>
        </div>
    );
}
