import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
} from "@mui/material";
import FilterSearchbar from "../rent/components/searchbars/FilterSearchbar";
import { checkboxStyle } from "../utils/checkboxStyle/checkboxStyle";
import { useNavigate } from "react-router-dom";

interface TextCheckboxFilterProps {
    title: string;
    options: Array<string>;
}

const TextCheckboxFilter = (props: TextCheckboxFilterProps) => {
    const { title, options } = props;

    const navigate = useNavigate();

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
            <Typography sx={{ fontWeight: 600, fontSize: "1.25rem", pb: 1 }}>
                {title}
            </Typography>
            <div className="pb-3">
                <FilterSearchbar />
            </div>
            <FormGroup
                sx={{
                    pt: 2,
                    display: "flex",
                    overflow: "scroll",
                    overflowX: "hidden",
                    maxHeight: "200px",
                    flexWrap: "nowrap",
                }}
            >
                {options.map((item) => (
                    <FormControlLabel
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
