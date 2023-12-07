import React from "react";
import { Button } from "@mui/base";
import { Header, CardShows, Form } from "../../components";
import { useShows } from "../../hooks/Shows/useShowFilter";

export default function Home() {
  const { filteredShows, setFilteredShows } = useShows();
  const [showForm, setShowForm] = React.useState<boolean>(false);

  return (
    <div className="w-screen">
      <Header setFilteredShows={setFilteredShows} />

      <div className="flex justify-between gap-6 px-20">
        <div />
        <span className="text-3xl flex justify-center pt-[40px]">
          Últimos eventos cadastrados
        </span>
        <Button
          className="bg-black text-white text-xs mt-[40px] p-[10px] rounded-md"
          onClick={() => setShowForm(true)}
        >
          ADICIONAR SHOWS
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-[64px] pt-[40px]">
        {filteredShows.map((show) => (
          <CardShows
            date={show.date}
            image={show.image}
            key={show.id}
            id={show.id}
            title={show.title}
            description={show.description}
          />
        ))}
      </div>
      {showForm && (
        <Form isOpen={showForm} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
