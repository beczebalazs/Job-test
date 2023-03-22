import { ChangeEvent, FC } from "react";

import { Pagination } from "@mui/material";

interface Props {
    handlePageChange: (event: ChangeEvent<unknown>, value: number) => void;
    currentPage: number;
    dataLength: number;
    itemsPerPage: number;
}

export const FooterPagination: FC<Props> = (props) => {
    const { currentPage, handlePageChange, dataLength, itemsPerPage } = props;

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
