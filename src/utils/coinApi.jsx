import { request } from "./api";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-Wpj5eQyssqiwtg6SG68LEonL",
  },
};

export const fetchCoins = () => {
  return request(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
    options
  );
};

// export const fetchCoins = () => {
//   return request(
//     `https://api.coingecko.com/api/v3/coins/markets?order=market_cap_desc&per_page=50&page=1&sparkline=false`,
//     options
//   );
// };
