import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import React from "react";

interface IProps {
  value: string | null;
  setValue: (time: string | null) => void;
}
export default function CustomTimeFormat({ setValue }: IProps) {
  const [selectedTime, setSelectedTime] = React.useState<string | null>(
    "00:00"
  );

  const handleDateChange = (date: string | null) => {
    setSelectedTime(date);
    setValue(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimeField", "TimeField", "TimeField"]}>
        <TimeField
          sx={{ width: 200 }}
          label="Horario do show"
          value={selectedTime}
          onChange={(time) => handleDateChange(time)}
          format="HH:mm"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
