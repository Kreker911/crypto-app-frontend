const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { id, endpoint, days, vs_currency } = req.query;
  const baseUrl = "https://api.coingecko.com/api/v3";

  let url = `${baseUrl}/coins/${id}/${endpoint}`;
  if (days) {
    url += `?vs_currency=${vs_currency}&days=${days}`;
  } else {
    url += `?vs_currency=${vs_currency}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
