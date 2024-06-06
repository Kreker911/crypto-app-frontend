import "./CoinsList.css";

import Pagination from "../Pagination/Pagination";
import PreLoader from "../PreLoader/PreLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { useState, useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { options } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const CoinsList = ({
  coins,
  isLoading,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [search, setSearch] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { number } = useParams();

  const page = parseInt(number, 10);

  useEffect(() => {
    if (!isNaN(page) && page !== currentPage) {
      onPageChange(page);
    }
  }, [number, currentPage]);

  useEffect(() => {
    if (!coins.length && !isLoading) {
      setError("Failed to load data. Please try again later.");
    } else {
      setError(null);
    }
  }, [coins, isLoading]);

  const handleSearch = () => {
    if (!search) {
      return coins;
    }

    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search?.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search?.toLowerCase())
    );
  };

  const formatNumber = (num) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + " $" + " T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + " $" + " B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + " $" + " M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + " $" + " K";
    } else {
      return num.toString();
    }
  };

  return (
    <div className="coins-list coins-list_margin">
      <input
        className="coins-list__input"
        type="text"
        placeholder="Search for crypto currency"
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <PreLoader />
      ) : (
        <>
          <table className="coins-list__table">
            <thead>
              <tr className="coins-list__header">
                <th>#</th>
                <th className="coins-list__header-name">Coin</th>
                <th className="coins-list__header-price">Price</th>
                <th className="coins-list__header-24h">24h %</th>
                <th className="coins-list__header-cap">Market Cap</th>
                <th className="coins-list__header-chart">Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {handleSearch().map((coin) => {
                const percentage = coin.price_change_percentage_24h;
                const percentage7d =
                  coin.price_change_percentage_7d_in_currency;
                return (
                  <tr
                    key={coin.id}
                    className="coins-list__row"
                    onClick={() => navigate(`/${coin.id}`)}
                  >
                    <td className="coins-list__rank">
                      {coin.market_cap_rank ? coin.market_cap_rank : "-"}
                    </td>

                    <td className="coins-list__coin">
                      <img
                        className="coins-list__image"
                        src={coin.image}
                        alt={coin.id}
                      />
                      <div className="coins-list__name">{coin.name}</div>
                      <div>
                        <div className="coins-list__symbol">
                          {coin.symbol.toUpperCase()}
                        </div>

                        <div className="coins-list__market-cap">
                          {coin.market_cap
                            ? formatNumber(coin.market_cap)
                            : "-"}
                        </div>
                      </div>
                    </td>

                    <td className="coins-list__coin_props">
                      ${coin.current_price}
                    </td>
                    <td
                      className="coins-list__coin_props coins-list__coin_props_hidden"
                      style={
                        percentage > 0
                          ? { color: "#16c784" }
                          : percentage == null
                          ? { color: "#fff" }
                          : { color: "#ea3943" }
                      }
                    >
                      {percentage > 0 && "+"}
                      {percentage ? percentage.toFixed(2) + "%" : "-"}
                    </td>
                    <td className="coins-list__coin_props coins-list__coin_props_hidden">
                      {coin.market_cap
                        ? "$" + coin.market_cap.toLocaleString()
                        : "-"}
                    </td>
                    <td className="coins-list__spark">
                      <Line
                        className="coins-list__chart"
                        data={{
                          labels: coin.sparkline_in_7d.price.map(
                            (data) => data
                          ),
                          datasets: [
                            {
                              data: coin.sparkline_in_7d.price,
                              borderColor:
                                coin.price_change_percentage_24h > 0
                                  ? "#16c784"
                                  : "#ea3943",

                              borderWidth: 1,
                              hoverRadius: 0,
                              pointHoverBorderWidth: 0,
                            },
                          ],
                        }}
                        options={options}
                      />
                      <div
                        className="coins-list__coin_props coins-list__coin_props_7d"
                        style={
                          percentage > 0
                            ? { color: "#16c784" }
                            : percentage == null
                            ? { color: "#fff" }
                            : { color: "#ea3943" }
                        }
                      >
                        {percentage7d > 0 && "+"}
                        {percentage7d ? percentage7d.toFixed(2) + "%" : "-"}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {handleSearch().length === 0 && (
            <div className="coin__none"> No matches found on current page </div>
          )}
          <Pagination
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default CoinsList;
