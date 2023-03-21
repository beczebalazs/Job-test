import { FC } from "react";
import { Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { RentFilters } from "../rent-filters/RentFilters";

interface Props {
    isModalOpen: boolean;
    handleCloseModal: () => void;
}

export const RentModal: FC<Props> = (props) => {
    const { isModalOpen, handleCloseModal } = props;

    return (
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
                <Grid item md={3} lg={3} xl={2} sx={{ pb: 2 }}>
                    <RentFilters />
                    <button
                        className="absolute top-0 right-0 m-2 text-gray font-bold text-xl"
                        onClick={handleCloseModal}
                    >
                        X
                    </button>
                </Grid>
            </Box>
        </Modal>
    );
};
