import Input from "@mui/joy/Input";
import { Search } from "@mui/icons-material";
import { BasicDatePicker, BasicSelect, Form } from "..";
import React from "react";
import { ISearch } from "./Header.structure";
import { Button } from "@mui/material";
import { useShows } from "../../hooks/Shows/useShowFilter";
import moment from "moment";
import Shows from "../../service/Shows/Shows";

export default function Header({ busca, setBusca }: ISearch) {
  const [selectedLocation, setSelectedLocation] = React.useState<string>("");
  const [selectedDate, setSelecteDate] = React.useState<Date | null>(null);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const { locationList } = useShows();

  const searchShows = React.useCallback(async () => {
    try {
      if (selectedDate) {
        const formattedDate = moment(selectedDate, "YYYY-MM-DD");
        const teste = formattedDate.toDate();

        const responseGet = await Shows.pesquisa(teste);
        console.log(responseGet);
        return responseGet;
      }
      return;
    } catch (error) {
      console.error("Erro ao pesquisar shows:", error);
    }
  }, [selectedDate]);

  return (
    <div className="flex h-[100px] px-[65px] bg-slate-100 justify-around items-center">
      <Input
        className="rounded-md h-[44px] w-[450px] text-right cursor-pointer after:border-b-0 border-solid border-slate-500"
        endDecorator={<Search />}
        results={5}
        slotProps={{
          input: {
            placeholder: "Pesquise por shows",
            type: "search",
            value: busca,
            onChange: (e) => setBusca(e.target.value),
          },
        }}
      />
      <BasicDatePicker
        value={selectedDate}
        setValue={setSelecteDate}
        style={{ width: 180 }}
      />
      <BasicSelect
        locationList={locationList}
        location={selectedLocation}
        setLocation={setSelectedLocation}
      />
      <Button onClick={searchShows}>Pesquisar</Button>
      <Button onClick={() => setShowForm(true)}>Adicionar shows</Button>
      {showForm && (
        <Form isOpen={showForm} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
