export interface ISearch {
  busca?: string;
  setBusca: React.Dispatch<React.SetStateAction<string>>;
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
