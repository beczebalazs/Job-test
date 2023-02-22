import { useState, ChangeEvent } from "react";

import { Grid, Pagination } from "@mui/material";

import Cards from "../../components/cards/Cards";
import { MockData } from "../../mock-data/MockData";

export default function Rent() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 15;

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
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
            <header className="p-20 text-center bg-lake-blue flex flex-col justify-center">
                <h1 className="text-white text-3xl font-medium mb-5">
                    Do you want to rent an apartment?
                </h1>
                <h2 className="text-white text-xl font-medium">
                    You are at the right place!
                </h2>
            </header>
            <div className="mx-10 my-5">
                <input
                    type="text"
                    placeholder="Search by Title or Description"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border rounded px-2 py-1 w-full"
                />
            </div>
            <Grid container spacing={2}>
                {filteredData
                    .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                    )
                    .map((data) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            className="flex justify-center items-center"
                        >
                            <Cards
                                key={data.id}
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
            <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                className="flex justify-center my-5"
            />
        </div>
    );
}
