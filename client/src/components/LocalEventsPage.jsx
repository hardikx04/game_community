import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import backgroundImage from "../assets/image.jpg";

export default function LocalEventsPage() {
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 200,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // padding: "10px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ backgroundColor: "transparent" }}>
        <Typography
          gutterBottom
          variant="h1"
          sx={{ fontSize: "35px", color: "#e4f647" }}
        >
          World Gaming Day!
        </Typography>
      </CardContent>
      <CardActions sx={{ backgroundColor: "transparent", paddingLeft: "12px" }}>
        <Button size="small" variant="contained" sx={{ borderRadius: "5px" }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
