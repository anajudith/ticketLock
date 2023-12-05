import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { pt } from "date-fns/locale";

interface IProps {
  value: Date;
}

export default function BasicDatePicker({ value }: IProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem>
          <DesktopDatePicker
            defaultValue={new Date("11/11/1111")}
            value={value}
            className="bg-white w-[150px] text-white rounded-md"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
