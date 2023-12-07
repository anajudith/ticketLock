/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@mui/joy/Input";
import { Search } from "@mui/icons-material";
import { BasicDatePicker, CustomTimeFormat, Form } from "..";
import React from "react";
import { ISearch } from "./Header.structure";
import { Button } from "@mui/material";
import Shows from "../../service/Shows/Shows";
import { IShow } from "../../service/Shows/Shows.structure";
import { formatDate, formatTime } from "../../utils/dateUtils";

export default function Header({ setFilteredShows }: ISearch) {
  const [selectedDate, setSelecteDate] = React.useState<Date | null>(null);
  const [eventTitleState, setEventTitleState] = React.useState<string>("");
  const [eventTime, setEventTime] = React.useState<string>("");

  const [showForm, setShowForm] = React.useState<boolean>(false);

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
        console.log(responseGet);

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
      <Input
        className="rounded-md h-[44px] w-[450px] text-right mt-[6px] cursor-pointer after:border-b-0 border-solid border-slate-500"
        endDecorator={<Search />}
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

      <Button
        className="border border-1 border-blue-600 bg-blue-600 text-white mt-[8px] text-xs"
        onClick={searchDate}
      >
        Pesquisar
      </Button>

      <Button
        className="bg-black text-white mt-[8px] text-xs"
        onClick={() => setShowForm(true)}
      >
        Adicionar shows
      </Button>
      {showForm && (
        <Form isOpen={showForm} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
