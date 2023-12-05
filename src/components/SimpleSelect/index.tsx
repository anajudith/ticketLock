import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { IProps } from "./SimpleSelect.structure";

export default function SimpleSelect({ options, placeholder, value }: IProps) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      value={value}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
}
