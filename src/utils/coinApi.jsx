import { request } from "./api";
import { apiOptions } from "./constants";

export const fetchCoins = (currentPage) => {
  return request(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=${currentPage}&sparkline=true&price_change_percentage=24h%2C7d`,
    apiOptions
  );
};

export const fetchCoin = (id) => {
  return request(`https://api.coingecko.com/api/v3/coins/${id}`, apiOptions);
};

export const fetchCoinHistory = (id, days) => {
  return request(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
};
