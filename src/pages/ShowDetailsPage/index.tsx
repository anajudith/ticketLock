import React from "react";
import { useParams } from "react-router-dom";
import ShowsService from "../../service/Shows/Shows";
import teste from "../../images/teste.jpeg";
import { IShowDetails } from "./ShowDetails.structure";

export default function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = React.useState<IShowDetails | false>();

  React.useEffect(() => {
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

  const formattedDate = new Date(show.date).toLocaleDateString("pt-BR");

  return (
    <div className="font-serif">
      <header className="bg-black h-[90px] justify-center flex items-center text-white">
        <a href="/">Ticket Lock</a>
      </header>
      <section className="bg-black h-[20%]">
        <div className=" w-[100%] bg-red-400">
          <img
            className="h-[55%] absolute bg-cover w-[100%] blur-md"
            src={teste}
            alt={show.title}
          />
        </div>
        <div className="flex justify-center items-center pt-[90px] rounded-lg">
          <img
            className="relative w-[50%] h-[50%] rounded-lg m-[-40px]"
            src={teste}
            alt={show.title}
          />
        </div>
      </section>
      <div className="px-[100px] pt-[56px]">
        <div className="flex flex-col">
          <span className="text-4xl tracking-wide font-bold">{show.title}</span>
          <h2 className="text-xl pt-[10px]">Data: {formattedDate}</h2>
          <h3 className="text-sm">Hora: {show.time}</h3>
          <h2 className="text-xl font-bold">Local: {show.city}</h2>
          <div className="pl-[800px]">
            <span className="flex">
              Classificação etária:
              <p className="text-red-600 pl-[5px]">{show.ageRating}</p>
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-[100%] border-[1px] border-slate-700 mb-[20px] " />
          <span className="text-2xl">Descrição do Show</span>
          <span className="text-slate-500 text-3xl pt-[30px]">
            {show.title}
          </span>
          <p>{show.description}</p>
          <p className="text-xl py-[40px]">
            Formas de pagamento: {show.paymentType}
          </p>
        </div>
      </div>
    </div>
  );
}
