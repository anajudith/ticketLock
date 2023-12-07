import Card from "@mui/material/Card";
import {
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICardShows } from "./CardShows.structure";
import { SelectVariants } from "..";
import moment from "moment";

export default function CardShows({
  title,
  description,
  date,
  id,
  image,
}: ICardShows) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/shows/${id}`);
  };

  const formatted = moment(date);
  const dataForShow = formatted.format("DD/MM/YYYY");

  return (
    <div className="m-[5%] min-w-[200px]  min-h-[50px] items-center justify-center flex content-center">
      <Card sx={{ maxWidth: 260, height: 350 }}>
        <CardMedia component="img" height="140" image={image} alt="Chevrolet" />
        <CardContent className="h-[110px]">
          <Typography
            gutterBottom
            className="text-xs text-blue-600"
            component="div"
          >
            {dataForShow}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className=" overflow-hidden line-clamp-2 min-h-[2px] leading-[1rem]"
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions className="flex  justify-between">
          <SelectVariants />
          <Button className="mt-[35px] " size="small" onClick={handleLearnMore}>
            Ler sobre
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
