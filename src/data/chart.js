
const commonOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { mode: "index", intersect: false },
  },
};
export const chartsData = {
  lineChart: {
    data: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Engagement",
          data: [100, 200, 150, 300, 400, 450, 500],
          borderColor: "#8884d8",
          backgroundColor: "rgba(136, 132, 216, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      ...commonOptions,
      scales: {
        x: { title: { display: true, text: "Days of the Week" } },
        y: { title: { display: true, text: "Engagement" }, beginAtZero: true },
      },
    },
  },
  pieChart: {
    data: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          data: [400, 300, 300],
          backgroundColor: ["#8884d8", "#82ca9d", "#ff7300"],
          hoverBackgroundColor: ["#7073b4", "#6cb785", "#cc5c00"],
        },
      ],
    },
  },
  barChart: {
    data: {
      labels: ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"],
      datasets: [
        {
          label: "Likes",
          data: [110, 39, 32, 24, 6],
          backgroundColor: [
            "#4caf50",
            "#4caf50",
            "#4caf50",
            "#ff9800",
            "#ff9800",
          ],
          borderRadius: 5,
          barThickness: 10,
        },
      ],
    },
    options:{
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: { x: { display: false }, y: { display: false } },
    }
  },
};

// Reusable card contents
export const StatsOverViewData = [
  {
    id: 1,
    title: "Total Comments This Week",
    value: 1234,
    change: 13,
    changeType: "up",
  },
  {
    id: 2,
    title: "Total Views This Week",
    value: 21052,
    change: 41,
    changeType: "down",
  },
  {
    id: 3,
    title: "Total Likes Average This Week",
    value: 86.56,
    change: 15,
    changeType: "up",
  },
  {
    id: 4,
    title: "Total Dislike Average This Week",
    value: 13.44,
    change: 2,
    changeType: "down",
  },
];