import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
          // label="Localização"
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
