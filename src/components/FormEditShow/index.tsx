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
import { IProps } from "../FormRegisterShow/Form.structure";
import Shows from "../../service/Shows/Shows";
import moment from "moment";
import { BasicDatePicker, CustomTimeFormat } from "..";
import { PaymentMethod, ageRating } from "../../utils/list";
import { useParams } from "react-router-dom";

interface IShowUpdate {
  date: any;
  paymentType: string;
  time: any;
}

export default function FormEditShow({ isOpen, onClose }: IProps) {
  const [selectedTime, setSelectedTime] = React.useState<string | null>("");

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(
    ""
  );
  const [inputValuePayment, setInputValuePayment] = React.useState("");
  const { id } = useParams();
  const [showDetails, setShowDetails] = React.useState<IShowUpdate>({
    date: new Date(),
    time: "",
    paymentType: "",
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

  const handlePaymentSelect = (paymentType: any | null) => {
    setSelectedPayment(paymentType);
    if (ageRating) {
      setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        paymentType: paymentType,
      }));
    }
  };

  const editInfoShow = async () => {
    try {
      const formattedDate = moment(showDetails.date, "YYYY-MM-DD");
      showDetails.date = formattedDate.toDate();

      const temp = new Date(showDetails.time);
      showDetails.time = `${temp.getHours()}:${temp.getMinutes()}`;

      const response = await Shows.updateShow(
        id as string,
        showDetails.date,
        showDetails.time,
        showDetails.paymentType
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
          Edição de informações
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} className="flex gap-2">
            <BasicDatePicker
              value={selectedDate}
              setValue={handleDateChange}
              style={{ width: 200 }}
            />

            <CustomTimeFormat
              value={selectedTime}
              setValue={handleTimeChange}
            />

            <Autocomplete
              value={selectedPayment}
              onChange={(event: any, newValue: string | null) => {
                handlePaymentSelect(newValue);
              }}
              inputValue={inputValuePayment}
              onInputChange={(event, newInputValue) => {
                setInputValuePayment(newInputValue);
              }}
              id="controllable-states-demo"
              options={PaymentMethod}
              sx={{ width: 200, paddingTop: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Pagamento" />
              )}
            />
          </Grid>
        </Grid>
        <div className="flex justify-between pt-[30px]">
          <Button onClick={onClose}>Fechar</Button>
          <Button startIcon={<Add />} onClick={editInfoShow}>
            Atualizar
          </Button>
        </div>
      </div>
    </form>
  );
}
