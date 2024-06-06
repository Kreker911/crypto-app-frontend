export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "7 Days",
    value: 7,
  },
  {
    label: "30 days",
    value: 30,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

export const dateOptions = { day: "numeric", month: "short", year: "numeric" };

export const totalPages = 133;

const apiKey = import.meta.env.VITE_API_KEY;

export const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": `${apiKey}`,
  },
};
