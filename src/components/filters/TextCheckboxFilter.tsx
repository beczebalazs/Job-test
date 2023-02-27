import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
} from "@mui/material";
import FilterSearchbar from "../rent/components/property-searchbar/FilterSearchbar";
import { checkboxStyle } from "../utils/checkboxStyle/checkboxStyle";

interface TextCheckboxFilterProps {
    title: string;
    options: Array<string>;
}

const TextCheckboxFilter = (props: TextCheckboxFilterProps) => {
    const { title, options } = props;

    console.log(options);
    return (
        <Paper elevation={8} sx={{ px: 2, py: 2}}>
            <Typography sx={{ fontWeight: 600, fontSize: "1.25rem", pb: 1 }}>
                {title}
            </Typography>
            <div className="pb-3">
                <FilterSearchbar />
            </div>
            <FormGroup sx={{ pt: 2, display: "flex",  overflow: "scroll", overflowX: "hidden", maxHeight:"200px", flexWrap: "nowrap" }}>
                {options.map((item) => (
                    <FormControlLabel
                        control={<Checkbox sx={checkboxStyle} />}
                        label={item}
                    />
                ))}
            </FormGroup>
        </Paper>
    );
};

export default TextCheckboxFilter;
