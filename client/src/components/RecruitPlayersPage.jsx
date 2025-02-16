import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";

export default function RecruitPlayersPage() {
  const cardData = Array.from({ length: 18 }, (_, index) => ({
    title: `Player ${index + 1}`,
    description: `Stats: 34 wins\nWin(%): 68%\nRank: 3285\nLeague: Silver`,
    image:
      "https://img.freepik.com/free-vector/polygonal-face-with-headphones_23-2147507024.jpg?ga=GA1.1.1175049919.1736341576&semt=ais_hybrid",
    alt: "green iguana",
  }));

  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 280 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.alt}
              />
              <CardContent sx={{ paddingBottom: "8px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ paddingTop: "4px" }}>
              <Button size="small" color="primary">
                Invite
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
