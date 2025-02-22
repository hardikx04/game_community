import { Line, Bar, Pie } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import { Paper, Box, Typography, Grid } from "@mui/material";
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

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.default,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={3} sx={{ height: "100%" }}>
        <Grid item xs={6} sx={{ height: "50%" }}>
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

        <Grid item xs={6} sx={{ height: "50%" }}>
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

        <Grid item xs={6} sx={{ height: "50%" }}>
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

        <Grid item xs={6} sx={{ height: "50%" }}>
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
                options={chartOptions}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
