import Input from "@mui/joy/Input";
import { Search } from "@mui/icons-material";
import { BasicDatePicker, BasicSelect, Form } from "..";
import React from "react";
import { ISearch } from "./Header.structure";
import { Button } from "@mui/material";
import { useShows } from "../../hooks/Shows/useShowFilter";

export default function Header({ busca, setBusca }: ISearch) {
  const [selectedLocation, setSelectedLocation] = React.useState<string>("");
  const [selectedDate, setSelecteDate] = React.useState<Date>(new Date());
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const { locationList } = useShows();
  const formattedDate = new Date(selectedDate).toLocaleDateString("pt-BR");
  console.log(formattedDate, "ola");

  return (
    <div className="flex h-[100px] bg-slate-100 justify-around items-center">
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
      <BasicDatePicker value={selectedDate} />
      <BasicSelect
        locationList={locationList}
        location={selectedLocation}
        setLocation={setSelectedLocation}
      />
      <Button onClick={() => setShowForm(true)}>Adicionar shows</Button>
      {showForm && (
        <Form
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          // handleSubmit={submitPostShow}
        />
      )}
    </div>
  );
}
