import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
} from "@mui/material";

import { checkboxStyle } from "../../../../utils/commonFunctions";
import FilterSearchbar from "./filter-search-bar";

interface Props {
    title: string;
    options: Array<string>;
}

const TextCheckboxFilter: FC<Props> = (props) => {
    const { title, options } = props;

    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;
        const queryParams = new URLSearchParams(window.location.search);

        if (checked) {
            queryParams.append(name, event.target.value);
        } else {
            const values = queryParams.getAll(name);
            values.splice(values.indexOf(event.target.value), 1);
            queryParams.delete(name);
            values.forEach((value) => queryParams.append(name, value));
        }

        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        navigate(newUrl, { replace: true });
    };

    return (
        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
            <Typography sx={{ pb: 1, fontWeight: 600, fontSize: "1.25rem" }}>
                {title}
            </Typography>
            <div className="pb-3">
                <FilterSearchbar
                    onChange={handleSearchChange}
                    value={searchValue}
                />
            </div>
            <FormGroup
                sx={{
                    maxHeight: "200px",
                    overflow: "scroll",
                    overflowX: "hidden",
                    display: "flex",
                    flexWrap: "nowrap",
                    pt: 2,
                }}
            >
                {filteredOptions.map((item) => (
                    <FormControlLabel
                        key={uuid()}
                        control={
                            <Checkbox
                                sx={checkboxStyle}
                                name={title}
                                value={item}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label={item}
                    />
                ))}
            </FormGroup>
        </Paper>
    );
};

export default TextCheckboxFilter;
