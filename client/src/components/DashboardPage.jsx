import { Line, Bar, Pie } from "react-chartjs-2";
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
  const styles = {
    dashboardContainer: {
      padding: "24px 32px",
      backgroundColor: "#f8fafc",
      height: "100vh",
      width: "100%",
      overflow: "hidden",
    },
    chartGrid: {
      display: "grid",
      gap: "24px",
      height: "100%",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
    },
    chartSection: {
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease",
      border: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
    },
    sectionTitle: {
      marginBottom: "16px",
      color: "#1f2937",
      fontSize: "1rem",
      fontWeight: "500",
      flexShrink: 0,
    },
    chart: {
      flex: 1,
      minHeight: 0,
      position: "relative",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const darkModeStyles = {
    dashboardContainer: {
      ...styles.dashboardContainer,
      backgroundColor: "#111827",
    },
    chartSection: {
      ...styles.chartSection,
      background: "#1f2937",
      border: "1px solid #374151",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
    },
    sectionTitle: {
      ...styles.sectionTitle,
      color: "#e5e7eb",
    },
    chart: {
      ...styles.chart,
    },
  };

  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const activeStyles = isDarkMode ? darkModeStyles : styles;

  // Single color scheme that works well in both modes
  const chartColors = {
    primary: "#3b82f6", // Blue
    secondary: "#8b5cf6", // Purple
    success: "#10b981", // Green
    warning: "#f59e0b", // Amber
    error: "#ef4444", // Red
    neutral: "#64748b", // Slate
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
          color: isDarkMode ? "#e5e7eb" : "#4b5563",
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
          color: isDarkMode ? "#9ca3af" : "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#374151" : "#f0f0f0",
        },
        ticks: {
          color: isDarkMode ? "#9ca3af" : "#6b7280",
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
    <div style={activeStyles.dashboardContainer}>
      <div style={styles.chartGrid}>
        <div style={activeStyles.chartSection}>
          <h3 style={activeStyles.sectionTitle}>Performance Trend</h3>
          <div style={activeStyles.chart}>
            <Line
              data={performanceData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div style={activeStyles.chartSection}>
          <h3 style={activeStyles.sectionTitle}>KDA Breakdown</h3>
          <div style={activeStyles.chart}>
            <Bar
              data={kdaData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div style={activeStyles.chartSection}>
          <h3 style={activeStyles.sectionTitle}>Team KDA Comparison</h3>
          <div style={activeStyles.chart}>
            <Bar
              data={playerKDAData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div style={activeStyles.chartSection}>
          <h3 style={activeStyles.sectionTitle}>Prize Distribution</h3>
          <div style={activeStyles.chart}>
            <Pie
              data={prizePoolData}
              options={{
                ...chartOptions,
                maintainAspectRatio: false,
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
