export const options = {
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

const apiKey = import.meta.env.VITE_API_KEY;

export const dateOptions = { day: "numeric", month: "short", year: "numeric" };

export const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": `${apiKey}`,
  },
};
