import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { pt } from "date-fns/locale";
import React from "react";
import { IProps } from "./BasicDatePicker.structure";

export default function BasicDatePicker({
  setValue,
  style,
  slotProps,
}: IProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setValue(date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DesktopDatePicker
            sx={style}
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
            className="bg-white  text-white rounded-md"
            slotProps={slotProps}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
