import { Divider } from "@mui/material";

import CheckboxFilter from "../../common/filters/checkbox-filter/CheckboxFilter";
import TextCheckboxFilter from "../../common/filters/text-checkbox-filter/TextCheckboxFilter";

export const RentFilters = () => {
    return (
        <div>
            <div className="pb-5">
                <CheckboxFilter
                    title="Price"
                    options={["1-100", "100-200", "300-400", "400-500", "500+"]}
                />
            </div>
            <Divider sx={{ mb: 2, display: { md: "none" } }} />
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
            <Divider sx={{ mb: 2, display: { md: "none" } }} />
            <div>
                <TextCheckboxFilter
                    title="Region"
                    options={["HR", "MS", "CV", "BV", "CJ", "B"]}
                />
            </div>
        </div>
    );
};
