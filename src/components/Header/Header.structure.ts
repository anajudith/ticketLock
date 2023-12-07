import { IShow } from "../../service/Shows/Shows.structure";

export interface ISearch {
  busca?: string;
  setFilteredShows: React.Dispatch<React.SetStateAction<IShow[]>>;
}

export interface IShowDetails {
  id: string;
  title: string;
  time: string;
  paymentType: string;
  ageRating: string;
  description: string;
  image: string;
  city: string;
  address: string;
  date: Date;
}
