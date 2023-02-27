import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { checkboxStyle } from "../utils/checkboxStyle/checkboxStyle";

interface CheckboxFilterProps {
    title: string;
    options: Array<String>;
}

const CheckboxFilter = (props: CheckboxFilterProps) => {
    const { title, options } = props;
    return (
        <Paper elevation={8} sx={{ px: 2, py: 2 }}>
            <Typography
                sx={{
                    fontWeight: 600,
                    fontSize: "1.25rem",
                }}
            >
                {title}
            </Typography>
            <FormGroup sx={{ pt: 2, display: "flex" }}>
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

export default CheckboxFilter;
