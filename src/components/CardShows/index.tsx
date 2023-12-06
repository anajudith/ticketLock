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

export default function CardShows({
  title,
  description,
  id,
  image,
}: ICardShows) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/shows/${id}`);
  };

  return (
    <div className="m-[5%] min-w-[200px]  min-h-[50px] items-center justify-center flex content-center">
      <Card sx={{ maxWidth: 260, height: 290 }}>
        <CardMedia component="img" height="140" image={image} alt="Chevrolet" />
        <CardContent className="h-[110px]">
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
          <Button size="small">Share</Button>
          <Button size="small" onClick={handleLearnMore}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
