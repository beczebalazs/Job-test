import { FC, ChangeEvent } from "react";
import { Pagination } from "@mui/material";

interface Props {
    dataLength: number;
    itemsPerPage: number;
    currentPage: number;
    handlePageChange: (event: ChangeEvent<unknown>, value: number) => void;
}

export const FooterPagination: FC<Props> = (props) => {
    const { dataLength, itemsPerPage, currentPage, handlePageChange } = props;

    return (
        <Pagination
            count={Math.ceil(dataLength / itemsPerPage)}
            page={currentPage}
            shape="rounded"
            onChange={handlePageChange}
            sx={{
                display: "flex",
                justifyContent: "center",
                my: 5,
            }}
        />
    );
};
