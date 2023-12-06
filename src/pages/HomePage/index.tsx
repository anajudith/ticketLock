import React from "react";
import { Header, CardShows } from "../../components";
import { useShows } from "../../hooks/Shows/useShowFilter";

export default function Home() {
  const { filteredShows, setBusca } = useShows();
  return (
    <div className="w-screen">
      <Header setBusca={setBusca} />
      <span className="text-3xl flex justify-center pt-[40px]">
        Últimos eventos cadastrados
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-[64px] pt-[40px]">
        {filteredShows.map((show) => (
          <CardShows
            image={show.image}
            key={show.id}
            id={show.id}
            title={show.title}
            description={show.description}
          />
        ))}
      </div>
    </div>
  );
}