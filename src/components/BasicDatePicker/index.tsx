import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Selecione a data"
          className="bg-white w-[10px] h-[28px] mb-[10px] pb-[40px] overflow-hidden text-white rounded-md"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
