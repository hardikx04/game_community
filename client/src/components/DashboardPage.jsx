import { Line, Bar, Pie } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import {
  Paper,
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const theme = useTheme();

  // Chart colors using theme palette
  const chartColors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    neutral: theme.palette.grey[500],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          padding: 8,
          color: theme.palette.text.primary,
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 10,
          padding: 8,
          color: theme.palette.text.primary,
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  const performanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "KDA Ratio",
        data: [2.5, 3.2, 2.8, 3.5, 4.0, 3.8],
        borderColor: chartColors.primary,
        backgroundColor: chartColors.primary,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const kdaData = {
    labels: ["Match 1", "Match 2", "Match 3", "Match 4", "Match 5"],
    datasets: [
      {
        label: "Kills",
        data: [12, 15, 10, 14, 16],
        backgroundColor: chartColors.success,
      },
      {
        label: "Deaths",
        data: [5, 4, 6, 3, 4],
        backgroundColor: chartColors.error,
      },
      {
        label: "Assists",
        data: [8, 10, 7, 9, 11],
        backgroundColor: chartColors.warning,
      },
    ],
  };

  const playerKDAData = {
    labels: ["P1", "P2", "P3", "P4", "P5"],
    datasets: [
      {
        label: "KDA Ratio",
        data: [3.5, 2.8, 4.2, 3.1, 3.8],
        backgroundColor: chartColors.secondary,
      },
    ],
  };

  const prizePoolData = {
    labels: ["1st", "2nd", "3rd", "Others"],
    datasets: [
      {
        data: [50000, 25000, 15000, 10000],
        backgroundColor: [
          chartColors.success,
          chartColors.primary,
          chartColors.secondary,
          chartColors.neutral,
        ],
      },
    ],
  };

  const leaderboardData = [
    { rank: 1, name: "Team Alpha", points: 2500, winRate: "75%" },
    { rank: 2, name: "Team Beta", points: 2350, winRate: "70%" },
    { rank: 3, name: "Team Gamma", points: 2200, winRate: "65%" },
    { rank: 4, name: "Team Delta", points: 2100, winRate: "62%" },
    { rank: 5, name: "Team Epsilon", points: 2000, winRate: "60%" },
    { rank: 6, name: "Team Zeta", points: 1950, winRate: "58%" },
    { rank: 7, name: "Team Eta", points: 1900, winRate: "57%" },
    { rank: 8, name: "Team Theta", points: 1850, winRate: "55%" },
    { rank: 9, name: "Team Iota", points: 1800, winRate: "54%" },
    { rank: 10, name: "Team Kappa", points: 1750, winRate: "53%" },
    { rank: 11, name: "Team Lambda", points: 1700, winRate: "52%" },
    { rank: 12, name: "Team Mu", points: 1650, winRate: "51%" },
    { rank: 13, name: "Team Nu", points: 1600, winRate: "50%" },
    { rank: 14, name: "Team Xi", points: 1550, winRate: "49%" },
    { rank: 15, name: "Team Omicron", points: 1500, winRate: "48%" },
  ];

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ height: "400px" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
            elevation={1}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Performance Trend
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <Line
                data={performanceData}
                options={chartOptions}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6} sx={{ height: "400px" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
            elevation={1}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              KDA Breakdown
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <Bar
                data={kdaData}
                options={chartOptions}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6} sx={{ height: "400px" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
            elevation={1}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Team KDA Comparison
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <Bar
                data={playerKDAData}
                options={chartOptions}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6} sx={{ height: "400px" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
            elevation={1}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Prize Distribution
            </Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <Pie
                data={prizePoolData}
                options={pieOptions}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ height: "400px" }}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
            elevation={1}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Tournament Leaderboard
            </Typography>
            <TableContainer sx={{ flex: 1 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Team Name</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell align="right">Win Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((row) => (
                    <TableRow key={row.rank}>
                      <TableCell>{row.rank}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                      <TableCell align="right">{row.winRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
