import { request } from "./api";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-Wpj5eQyssqiwtg6SG68LEonL",
  },
};

export const fetchCoins = (currentPage) => {
  return request(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=${currentPage}&sparkline=true`,
    options
  );
};
