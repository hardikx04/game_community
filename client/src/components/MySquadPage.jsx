import {
  Box,
  Card,
  Container,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const squadMembers = [
  {
    name: "Shadow",
    role: "Sniper",
    avatar: "https://i.pravatar.cc/150?img=1",
    rank: "Elite",
  },
  {
    name: "Vortex",
    role: "Strategist",
    avatar: "https://i.pravatar.cc/150?img=2",
    rank: "Master",
  },
  {
    name: "FreedomFighter",
    role: "Assault",
    avatar: "https://i.pravatar.cc/150?img=3",
    rank: "Veteran",
  },
  {
    name: "Ghost",
    role: "Stealth",
    avatar: "https://i.pravatar.cc/150?img=4",
    rank: "Pro",
  },
];

export default function MySquadPage() {
  const [motto, setMotto] = useState("Together, We Conquer!");
  const theme = useTheme();

  return (
    <Container
      sx={{
        py: 5,
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={4}>
        ⚡ My Squad ⚡
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        mb={4}
        color="text.secondary"
        component="div"
      >
        <em>"{motto}"</em>
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {squadMembers.map((member, index) => (
          <Grid item key={index} xs={12} md={5}>
            <Card
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6" mb={0.5}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    {member.role}
                  </Typography>
                  <Chip label={member.rank} color="primary" size="small" />
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setMotto("Legends Never Die!")}
        >
          Change Motto
        </Button>
      </Box>
    </Container>
  );
}
