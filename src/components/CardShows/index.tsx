import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chevrolet from "../../images/pitty.jpeg";
import { useNavigate } from "react-router-dom";

interface ICardShows {
  id?: string;
  title: string;
  description: string;
}

export default function CardShows({ title, description, id }: ICardShows) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/shows/${id}`);
  };

  return (
    <div className="m-[5%] min-w-[200px]  min-h-[50px] items-center justify-center flex content-center">
      <Card sx={{ maxWidth: 250, height: 290 }}>
        <CardMedia
          component="img"
          height="140"
          image={Chevrolet}
          alt="Chevrolet"
        />
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
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small" onClick={handleLearnMore}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
