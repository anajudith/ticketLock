import React from "react";
import { useParams } from "react-router-dom";
import ShowsService from "../../service/Shows/Shows";
import { IShowDetails } from "./ShowDetails.structure";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { FormEditShow } from "../../components";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import EventNoteIcon from "@mui/icons-material/EventNote";
import moment from "moment";

export default function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = React.useState<IShowDetails | false>();
  const [showForm, setShowForm] = React.useState<boolean>(false);

  React.useMemo(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await ShowsService.getShowById(id as string);
        setShow(response);
      } catch (error) {
        console.error("Error ao carregar detalhes do show", error);
      }
    };
    fetchShowDetails();
  }, [id]);

  if (!show) {
    return (
      <div className="flex justify-center items-center w-screen h-screen text-6xl">
        Loading...
      </div>
    );
  }

  const formatted = moment(show.date);
  const dataForShow = formatted.format("DD/MM/YYYY");

  return (
    <div className="font-serif mb-[40px]">
      <header className="bg-black h-[90px] justify-center flex items-center text-white">
        <a href="/">Ticket Lock</a>
      </header>
      <section className="bg-black h-[20%]">
        <div className=" w-[100%]">
          <img
            className="h-[55%] absolute bg-cover w-[100%] blur-sm"
            src={show.image}
            alt={show.title}
          />
        </div>
        <div className="flex justify-center items-center pt-[90px] rounded-lg">
          <img
            className="relative w-[50%] h-[50%] rounded-lg m-[-40px]"
            src={show.image}
            alt={show.title}
          />
        </div>
      </section>
      <div className="px-[100px] pt-[100px] flex justify-around">
        <div className="flex flex-col w-[30%] bg-transparent border-r-4 border-blue-600  p-4 m-4 gap-[6px]">
          <span className="text-4xl tracking-wide  font-extralight">
            {show.title}
          </span>
          <h2 className="text-xl pt-[10px]">
            <EventNoteIcon /> {dataForShow}
          </h2>
          <h3 className="text-xl">
            <HistoryToggleOffIcon /> {show.time}
          </h3>
          <h2 className="text-xl">
            <FmdGoodIcon /> {show.address}
          </h2>
          <h2 className="text-xl ">{show.city}</h2>
          <div className="flex text-sm">
            <span>Classificação etária:</span>
            <p className="text-red-600 pl-[4px] ">{show.ageRating}</p>
            <Button
              className="p-0 m-0 flex"
              size="small"
              startIcon={<CreateIcon />}
              onClick={() => setShowForm(true)}
            />
          </div>
        </div>
        <div className="flex flex-col w-[50%] pl-[30px] pt-[10px]">
          <span className="text-4xl pb-[10px]">Sobre o show</span>

          <p>{show.description}</p>
          <p className="text-xl text-slate-700 py-[40px] bg-">
            Forma de pagamento: {show.paymentType}
          </p>
        </div>
      </div>
      {showForm && (
        <FormEditShow isOpen={showForm} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
