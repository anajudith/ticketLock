export interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
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
