import Input from "@mui/joy/Input";
import { Search } from "@mui/icons-material";
import { BasicDatePicker } from "..";

export default function Header() {
  return (
    <div className="bg-slate-300 h-[80px] w-full flex justify-center items-center">
      <div className="w-full h-[50px] flex justify-center items-center gap-4 mx-[90px]">
        <Input
          className="rounded-md bg-white w-[440px] h-[30px] px-[10px] text-right cursor-pointer after:border-b-0 border-b-0"
          endDecorator={<Search />}
          results={5}
          slotProps={{
            input: {
              placeholder: "Pesquise por shows, local, dia, horario",
              type: "search",
            },
          }}
        />
        <BasicDatePicker />
      </div>
      {/* <Button className="bg-white px-[10px] rounded-md mr-[90px]">Login</Button> */}
    </div>
  );
}
