export const barChartDefaultStyles = [
  {
    backgroundColor: 'rgba(47, 128, 237, 1)', // Blue
    borderColor: 'rgba(47, 128, 237, 1)',
    borderWidth: 1,
    barThickness: 25,
  },
  {
    backgroundColor: 'rgba(242, 153, 74, 1)', // Orange
    borderColor: 'rgba(242, 153, 74, 1)',
    borderWidth: 1,
    barThickness: 25,
  }
]
// Define static Chart.js defaults
export const barChartDefaults = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
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
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}+`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: 'Poppins', size: 10 },
          color: '#9CA3AF',
        },
      },
      y: {
        border: { dash: [2, 4], display: false },
        ticks: {
          font: { family: 'Poppins', size: 10 },
          color: '#9CA3AF',
          stepSize: 500,
          callback: (value) => `${value}`,
        },
      },
    },
  },
};

export const sentimentDataColor = {
  happyWords: ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9"],
  sadWords: ["#1E88E5", "#42A5F5", "#64B5F6", "#90CAF9", "#BBDEFB"],
  greetWords: ["#FFC107", "#FFD54F", "#FFEB3B", "#FFF176", "#FFF59D"],
  neutral: ["#9E9E9E", "#BDBDBD", "#E0E0E0", "#EEEEEE", "#F5F5F5"],
  angryWords: ["#E53935", "#EF5350", "#F44336", "#E57373", "#FFCDD2"],
}

export const chartDefaults = {
  font: {
    family: "Poppins",
    size: 12,
    weight: "bold",
  },
  colors: {
    line: ["#3B82F6", "#22C55E", "#9333EA", "#EC4899", "#14B8A6"],
    pie: ["#8884d8", "#82ca9d", "#ff7300"],
    bar: ["#4caf50", "#ff9800"],
    doughnut: ["#22C55E", "#F59E0B", "#EF4444"],
  },
  grid: {
    display: false,
    borderDash: [2, 4],
  },
  tooltip: (suffix = "") => ({
    callbacks: {
      label: (tooltipItem) => `${tooltipItem.raw}${suffix}`,
    },
  }),
};

export const sharedLegend = {
  display: true,
  position: "bottom",
  labels: {
    usePointStyle: true,
    pointStyle: "circle",
    font: { size: 10 },
    boxWidth: 10,
    boxHeight: 5,
    padding: 10,
  },
};

export const sharedScales = {
  x: {
    grid: chartDefaults.grid,
    ticks: { font: chartDefaults.font, color: "#ABB2BC" },
  },
  y: {
    grid: chartDefaults.grid,
    ticks: {
      font: chartDefaults.font,
      color: "#ABB2BC",
      callback: (value) => `${value}`,
    },
  },
};

export const sharedOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: sharedLegend,
    tooltip: chartDefaults.tooltip(),
  },
  scales: sharedScales,
};

// Line Chart Options
export const lineChartOptions = {
  ...sharedOptions,
  elements: {
    line: { tension: 0.01 },
    point: { radius: 0 },
  },
};

// Pie Chart Options
export const pieChartOptions = {
  ...sharedOptions,
  plugins: {
    ...sharedOptions.plugins,
    tooltip: chartDefaults.tooltip("+"),
  },
};

// Bar Chart Options
export const barChartOptions = {
  ...sharedOptions,
  indexAxis: "y",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

// Doughnut Chart Options
export const doughnutChartOptions = {
  ...sharedOptions,
  cutout: "40%",
  plugins: {
    ...sharedOptions.plugins,
    tooltip: chartDefaults.tooltip("+"),
  },
};

// Dotted Line Chart Options
export const dottedLineChartOptions = {
  ...sharedOptions,
  elements: {
    line: { borderWidth: 2, borderDash: [5, 5], tension: 0.4 },
    point: { radius: 0 },
  },
};

export const chartStyles = {
  bar: {
    label: "Likes",
    backgroundColor: ["#4caf50", "#4caf50", "#4caf50", "#ff9800", "#ff9800"],
    borderWidth: 1,
    borderRadius: 5,
    barThickness: 10,
    tension: 0.01,
    pointRadius: 0
  },
  line: {
    borderColor: ["#3B82F6", "#22C55E", "#9333EA", "#EC4899", "#14B8A6"],
    borderWidth: 2,
    tension: 0.4,
    fill: false,
  },
  pie: {
    backgroundColor: ["#8884d8", "#82ca9d", "#ff7300"],
    hoverBackgroundColor: ["#7073b4", "#6cb785", "#cc5c00"],
  },
  doughnut: {
    backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
    borderColor: ["#22C55E", "#F59E0B", "#EF4444"],
    borderWidth: 1,
  },
  dottedLine: {
    borderColor: ["rgba(136, 178, 84, 0.5)", "rgba(136, 178, 84, 1)"],
    borderWidth: 2,
    borderDash: [5, 5],
    tension: 0.4,
    fill: false,
  },
};



// export const chartsData = {
//   lineChart: {
//     data: {
//       labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//       datasets: [
//         { label: "Video 1", data: [100, 1200, 150, 200, 250, 300, 500], borderColor: '#3B82F6', backgroundColor: "#3B82F6", tension: 0.01, pointRadius: 0 },
//         { label: "Video 2", data: [50, 80, 100, 120, 180, 200, 250], borderColor: "#22C55E", backgroundColor: "#22C55E", tension: 0.01, pointRadius: 0 },
//         { label: "Video 3", data: [70, 90, 130, 160, 220, 270, 300], borderColor: "#9333EA", backgroundColor: "#9333EA", tension: 0.01, pointRadius: 0 },
//         { label: "Video 4", data: [30, 50, 90, 140, 200, 240, 260], borderColor: "#EC4899", backgroundColor: "#EC4899", tension: 0.01, pointRadius: 0 },
//         { label: "Video 5", data: [20, 40, 60, 100, 130, 170, 200], borderColor: "#14B8A6", backgroundColor: "#14B8A6", tension: 0.01, pointRadius: 0 },
//       ],

//     },
//     options: {
//       ...sharedOptions,

//       scales: {
//         x: {
//           grid: { display: false },
//           ticks: {
//             font: { family: 'Poppins', size: 10 }, color: '#ABB2BC',
//           },
//         },
//         y: {
//           border: { dash: [2, 4] },
//           ticks: {
//             font: { family: 'Poppins', size: 10 },
//             color: '#ABB2BC',
//             stepSize: 500,
//             callback: value => `${value}`,
//           },
//         },
//       },
//     },
//   },
//   pieChart: {
//     data: {
//       labels: ["Positive", "Neutral", "Negative"],
//       datasets: [
//         {
//           data: [400, 300, 3000],
//           backgroundColor: ["#8884d8", "#82ca9d", "#ff7300"],
//           hoverBackgroundColor: ["#7073b4", "#6cb785", "#cc5c00"],
//         },
//       ],
//     },
//     options: {
//       ...sharedOptions,
//       plugins: {
//         ...sharedOptions.plugins,
//         tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.raw}+` } },
//       },
//     },
//   },
//   barChart: {
//     data: {
//       labels: ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"],
//       datasets: [
//         {
//           label: "Likes",
//           data: [110, 39, 32, 24, 6],
//           backgroundColor: ["#4caf50", "#4caf50", "#4caf50", "#ff9800", "#ff9800"],
//           borderRadius: 5,
//           barThickness: 10,
//         },
//       ],
//     },
//     options: {
//       indexAxis: "y",
//       plugins: { legend: { display: false }, tooltip: { enabled: false } },
//       scales: { x: { display: false }, y: { display: false } },
//     },
//   },
//   doughnut: {
//     data: {
//       labels: ["Positive", "Neutral", "Negative"],
//       datasets: [
//         {
//           label: "Sentiment Analysis",
//           data: [65, 25, 10],
//           backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"],
//           borderColor: ["#22C55E", "#F59E0B", "#EF4444"],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       ...sharedOptions,
//       cutout: "40%",
//       plugins: {
//         ...sharedOptions.plugins,
//         tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.raw}+` } },
//       },
//     },
//   },
//   dottedLine: {
//     data: {
//       labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//       datasets: [
//         {
//           label: "Last Week",
//           data: [40, 50, 60, 70, 80, 85, 90], // Replace with your data
//           borderColor: "rgba(136, 178, 84, 0.5)",
//           borderWidth: 2,
//           borderDash: [5, 5], // Makes the line dotted
//           tension: 0.4,
//           pointRadius: 0,
//         },
//         {
//           label: "This Week",
//           data: [30, 45, 70, 80, 95, 85, 100], // Replace with your data
//           borderColor: "rgba(136, 178, 84, 1)",
//           borderWidth: 2,
//           tension: 0.4,
//           pointRadius: 0,
//         },
//       ],
//     },
//     options: {
//       ...sharedOptions,
//       plugins: {
//         legend: {
//           display: true,
//           position: "bottom",
//           labels: {
//             font: { family: "Poppins", size: 12 },
//             boxWidth: 40, // Controls the size of the legend
//             boxHeight: 1,
//             useLineStyle: true,
//           },
//         },
//       },

//       scales: {
//         x: {
//           grid: {
//             display: false,
//           },


//           ticks: {
//             font: {
//               family: 'Poppins',
//               size: 10,
//             },
//             color: '#9CA3AF',
//           },
//         },
//         y: {
//           border: { dash: [2, 4] },

//           beginAtZero: true,
//           max: 100,
//           ticks: {
//             font: { family: 'Poppins', size: 12 },
//             color: 'rgba(171, 178, 188, 1)',
//             stepSize: 20,
//             callback: value => `${value} %`,
//           },
//         },
//       },
//     },
//   }
// };

// // Reusable card contents
// export const StatsOverViewData = [
//   {
//     id: 1,
//     title: "Total Comments This Week",
//     value: 1234,
//     change: 13,
//     changeType: "up",
//   },
//   {
//     id: 2,
//     title: "Total Views This Week",
//     value: 21052,
//     change: 41,
//     changeType: "down",
//   },
//   {
//     id: 3,
//     title: "Total Likes Average This Week",
//     value: 86.56,
//     change: 15,
//     changeType: "up",
//   },
//   {
//     id: 4,
//     title: "Total Dislike Average This Week",
//     value: 13.44,
//     change: 2,
//     changeType: "down",
//   },
// ];