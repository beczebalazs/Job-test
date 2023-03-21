import { useNavigate } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { checkboxStyle } from "../../../../utils/commonFunctions";

interface CheckboxFilterProps {
    title: string;
    options: Array<String>;
}

const CheckboxFilter = (props: CheckboxFilterProps) => {
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

export default CheckboxFilter;
