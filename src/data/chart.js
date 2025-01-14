
const sharedOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: { size: 10 },
        boxWidth: 10,
        padding: 20,
      },
    },
  },
};


export const chartsData = {
  lineChart: {
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        { label: "Video 1", data: [100, 1200, 150, 200, 250, 300, 500], borderColor: '#3B82F6', backgroundColor: "#3B82F6", tension: 0.01, pointRadius: 0 },
        { label: "Video 2", data: [50, 80, 100, 120, 180, 200, 250], borderColor: "#22C55E", backgroundColor: "#22C55E", tension: 0.01, pointRadius: 0 },
        { label: "Video 3", data: [70, 90, 130, 160, 220, 270, 300], borderColor: "#9333EA", backgroundColor: "#9333EA", tension: 0.01, pointRadius: 0 },
        { label: "Video 4", data: [30, 50, 90, 140, 200, 240, 260], borderColor: "#EC4899", backgroundColor: "#EC4899", tension: 0.01, pointRadius: 0 },
        { label: "Video 5", data: [20, 40, 60, 100, 130, 170, 200], borderColor: "#14B8A6", backgroundColor: "#14B8A6", tension: 0.01, pointRadius: 0 },
      ],

    },
    options: {
      ...sharedOptions,

      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: 'Poppins', size: 10 }, color: '#ABB2BC',
          },
        },
        y: {
          border: { dash: [2, 4] },
          ticks: {
            font: { family: 'Poppins', size: 10 },
            color: '#ABB2BC',
            stepSize: 500,
            callback: value => `${value}`,
          },
        },
      },
    },
  },
  pieChart: {
    data: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          data: [400, 300, 3000],
          backgroundColor: ["#8884d8", "#82ca9d", "#ff7300"],
          hoverBackgroundColor: ["#7073b4", "#6cb785", "#cc5c00"],
        },
      ],
    },
    options: {
      ...sharedOptions,
      plugins: {
        ...sharedOptions.plugins,
        tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.raw}+` } },
      },
    },
  },
  barChart: {
    data: {
      labels: ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"],
      datasets: [
        {
          label: "Likes",
          data: [110, 39, 32, 24, 6],
          backgroundColor: ["#4caf50", "#4caf50", "#4caf50", "#ff9800", "#ff9800"],
          borderRadius: 5,
          barThickness: 10,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  },
  doughnut: {
    data: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          label: "Sentiment Analysis",
          data: [65, 25, 10],
          backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
          borderColor: ["#22C55E", "#F59E0B", "#EF4444"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      ...sharedOptions,
      cutout: "40%",
      plugins: {
        ...sharedOptions.plugins,
        tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.raw}+` } },
      },
    },
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