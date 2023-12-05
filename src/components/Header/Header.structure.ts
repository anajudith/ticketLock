export interface ISearch {
  busca?: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export interface IShowDetails {
  date: number;
  time: string;
  paymentType: string;
  ageRating: string;
  location: string;
  title: string;
  description: string;
  image: string;
  id: string;
}
