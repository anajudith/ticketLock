import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chevrolet from "../../../public/images/pitty.jpeg";

export default function CardShows() {
  return (
    <div style={{ margin: "5%" }}>
      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          height="140"
          image={Chevrolet}
          alt="Chevrolet"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Titulo do show
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description show
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
