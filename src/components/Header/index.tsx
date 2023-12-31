/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@mui/joy/Input";
import { BasicDatePicker, CustomTimeFormat } from "..";
import React from "react";
import { ISearch } from "./Header.structure";
import { Button } from "@mui/material";
import Shows from "../../service/Shows/Shows";
import { IShow } from "../../service/Shows/Shows.structure";
import { formatDate, formatTime } from "../../utils/dateUtils";
import HeaderMain from "../HeaderMain";

export default function Header({ setFilteredShows }: ISearch) {
  const [selectedDate, setSelecteDate] = React.useState<Date | null>(null);
  const [eventTitleState, setEventTitleState] = React.useState<string>("");
  const [eventTime, setEventTime] = React.useState<string>("");

  const searchDate = React.useCallback(async () => {
    try {
      if (selectedDate != null || eventTitleState != "" || eventTime != "") {
        const eventDate = formatDate(selectedDate);
        const eventTimeTemp = formatTime(eventTime);
        const responseGet = await Shows.pesquisa(
          eventTitleState,
          eventDate,
          eventTimeTemp
        );

        setFilteredShows(responseGet as IShow[]);
        return responseGet;
      }
      return;
    } catch (error) {
      console.error("Erro ao pesquisar shows:", error);
    }
  }, [selectedDate, eventTitleState, eventTime, setFilteredShows]);

  return (
    <div className="flex h-[100px] px-[65px] bg-slate-100 justify-around items-center">
      <HeaderMain />
      <BasicDatePicker
        value={selectedDate}
        setValue={setSelecteDate}
        style={{ width: 180 }}
        slotProps={{ textField: { size: "small", paddingTop: 10 } }}
      />
      <CustomTimeFormat
        slotProps={{ textField: { size: "small" } }}
        value={eventTime}
        setValue={(e: any) => setEventTime(e)}
      />

      <Input
        className="rounded-md h-[44px] w-[450px] text-right mt-[6px] cursor-pointer after:border-b-0 border-solid border-slate-500"
        results={5}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEventTitleState(e.target.value)
        }
        slotProps={{
          input: {
            placeholder: "Pesquise por shows",
            type: "search",
          },
        }}
      />

      <Button
        className="border border-1 border-blue-600 bg-blue-600 text-white mt-[8px] text-xs"
        onClick={searchDate}
      >
        Pesquisar
      </Button>
    </div>
  );
}
