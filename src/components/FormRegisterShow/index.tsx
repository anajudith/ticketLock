/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Typography,
  TextField,
  Autocomplete,
  Grid,
  Button,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { IProps, IShowDetails } from "./Form.structure";
import Shows from "../../service/Shows/Shows";
import moment from "moment";
import { BasicDatePicker, CustomTimeFormat, InputFileUpload } from "..";
import { PaymentMethod, ageRating } from "../../utils/list";
import { useApiCity } from "../../hooks/CitiesApi";

export default function AddShowsForm({ isOpen, onClose }: IProps) {
  const { cities } = useApiCity();

  const [selectedTime, setSelectedTime] = React.useState<string | null>("");
  const [selectedCity, setSelectedCity] = React.useState<string | null>("");
  const [selectedAgeRating, setSelectedAgeRating] = React.useState<
    string | null
  >("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(
    ""
  );
  const [inputValuePayment, setInputValuePayment] = React.useState("");
  const [inputValueAge, setInputValueAge] = React.useState("");
  const [inputValueCity, setInputValueCity] = React.useState("");

  const [showDetails, setShowDetails] = React.useState<IShowDetails>({
    title: "",
    time: "",
    paymentType: "",
    ageRating: "",
    description: "",
    image: "",
    address: "",
    city: "",
    date: new Date(),
    id: "",
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        date: date,
      }));
    }
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
    if (time) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        time: time,
      }));
    }
  };

  const handleCityChange = (city: string | null) => {
    setSelectedCity(city);
    if (city) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        city: city,
      }));
    }
  };

  const handleAgeRatingSelect = (ageRating: string | null) => {
    setSelectedAgeRating(ageRating);
    if (ageRating) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        ageRating: ageRating,
      }));
    }
  };

  const handlePaymentSelect = (paymentType: any | null) => {
    setSelectedPayment(paymentType);
    if (paymentType) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        paymentType: paymentType,
      }));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [name]: value,
    }));
  };

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
      const formattedDate = moment(showDetails.date, "YYYY-MM-DD");
      showDetails.date = formattedDate.toDate();

      const temp = new Date(showDetails.time);
      showDetails.time = `${temp.getHours()}:${temp.getMinutes()}`;

      const response = await Shows.postShow(
        showDetails.title,
        showDetails.time,
        showDetails.paymentType,
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
    <form
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
              id="title"
              name="title"
              label="Título do show"
              fullWidth
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
              variant="standard"
              value={showDetails.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="flex gap-[40px]">
            <Autocomplete
              value={selectedCity}
              onChange={(_event: any, newValue: string | null) => {
                handleCityChange(newValue);
              }}
              inputValue={inputValueCity}
              onInputChange={(_event, newInputValue) => {
                setInputValueCity(newInputValue);
              }}
              id="city"
              options={cities}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Selecione a cidade" />
              )}
            />
            <div>
              <TextField
                className="w-[300px] pt-[6px] "
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
            </div>
          </Grid>
          <Grid item xs={12} className="flex gap-6">
            <BasicDatePicker
              value={selectedDate}
              setValue={handleDateChange}
              style={{ width: 200 }}
            />

            <CustomTimeFormat
              value={selectedTime}
              setValue={handleTimeChange}
              slotProps={{ textField: { size: "medium" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <div className=" flex gap-6 ">
              <Autocomplete
                value={selectedAgeRating}
                onChange={(_event: any, newValue: string | null) => {
                  handleAgeRatingSelect(newValue);
                }}
                inputValue={inputValueAge}
                onInputChange={(_event, newInputValue) => {
                  setInputValueAge(newInputValue);
                }}
                id="ageRating"
                options={ageRating}
                sx={{ width: 240 }}
                renderInput={(params) => (
                  <TextField {...params} label="Classificação etária" />
                )}
              />
              <Autocomplete
                value={selectedPayment}
                onChange={(_event: any, newValue: string | null) => {
                  handlePaymentSelect(newValue);
                }}
                inputValue={inputValuePayment}
                onInputChange={(_event, newInputValue) => {
                  setInputValuePayment(newInputValue);
                }}
                id="paymentType"
                options={PaymentMethod}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField {...params} label="Pagamento" />
                )}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className="mt-[20px] ml-[2px]">
            <InputFileUpload onFileSelect={handleFileSelect} />
          </Grid>
        </Grid>
        <div className="flex justify-between pt-[30px]">
          <Button className="bg-blue-600 text-white" onClick={onClose}>
            Fechar
          </Button>
          <Button
            className="bg-blue-600 text-white"
            startIcon={<Add />}
            onClick={submitPostShow}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </form>
  );
}
