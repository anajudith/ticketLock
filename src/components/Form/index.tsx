import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { IProps } from "./Form.structure";
import Shows from "../../service/Shows/Shows";
import {
  BasicDatePicker,
  InputFileUpload,
  MultipleSelect,
  SimpleSelect,
} from "..";
import CitiesApi from "../../hooks/CitiesApi";

export interface IShowDetails {
  id: string;
  title: string;
  time: string;
  paymentType: string;
  ageRating: number;
  description: string;
  image: string;
  // location: string;
  city: string;
  address: string;
  date: Date;
}

export default function AddShowsForm({ isOpen, onClose }: IProps) {
  const [cities, setCities] = React.useState<string[]>([]);
  const [selectedPayment, setSelectedPayment] = React.useState<string>("");

  const [showDetails, setShowDetails] = React.useState<IShowDetails>({
    title: "",
    time: "",
    paymentType: "",
    ageRating: 0,
    description: "",
    image: "",
    address: "",
    city: "",
    date: new Date(),
    id: "",
  });
  const PaymentMethod = ["Pix", "Cartão de crédito", "Cartão de débito"];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await CitiesApi(); // Assuming CitiesApi is a function that fetches cities data
        console.log(citiesData, "dalolo");
        setCities(citiesData);
        return citiesData;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowDetails((prevShowDetails) => ({
          ...prevShowDetails,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitPostShow = async () => {
    try {
      const response = await Shows.postShow(
        showDetails.title,
        showDetails.time,
        selectedPayment,
        showDetails.ageRating,
        showDetails.description,
        showDetails.image,
        showDetails.address,
        showDetails.city,
        showDetails.date
      );
      if (!response) {
        console.error();
      }
      onClose();
      return;
    } catch (error) {
      console.error("Error ao cadastrar show:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      } z-50`}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg`}
      >
        <Typography variant="h6" gutterBottom>
          Cadastro de shows
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Titulo do show"
              name="title"
              label="Título do show"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={showDetails.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Descrição"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={showDetails.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="flex justify-between">
            {/* <TextField
              required
              id="city"
              name="city"
              label="Cidade"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={showDetails.city}
              onChange={handleChange}
            /> */}
            {/* <SimpleSelect value={} /> */}
            <SimpleSelect
              placeholder="Selecione uma cidade"
              options={cities}
              value={showDetails.city}
            />
            <div className="">
              <BasicDatePicker value={showDetails.date} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="address"
              name="address"
              label="Endereço"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={showDetails.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <BasicDatePicker value={showDetails.date} onChange={teste} /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="time"
              name="time"
              label="Horário"
              fullWidth
              variant="standard"
              value={showDetails.time}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MultipleSelect
              // valueSelect={showDetails.paymentType}
              // setValueSelect={handleChange}
              names={PaymentMethod}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="mt-[20px] ml-[2px]">
            <InputFileUpload onFileSelect={handleFileSelect} />
          </Grid>
        </Grid>
        <div className="flex justify-between pt-[30px]">
          <Button onClick={onClose}>Fechar</Button>
          <Button startDecorator={<Add />} onClick={submitPostShow}>
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
