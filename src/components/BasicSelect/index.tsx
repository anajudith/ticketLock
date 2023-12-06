import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { ISelecOption } from "./BasicSelect.structure";

export default function BasicSelect({
  locationList,
  location,
  setLocation,
}: ISelecOption) {
  return (
    <Box>
      <FormControl className="w-[130px] h-[10px] mb-[46px] border-none border-transparent border-4">
        <InputLabel id="demo-simple-select-label">Localização</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value as string);
          }}
          sx={{
            fieldset: {
              border: "none",
            },
          }}
        >
          {locationList.map((locationItem) => (
            <MenuItem key={locationItem} value={locationItem}>
              {locationItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
