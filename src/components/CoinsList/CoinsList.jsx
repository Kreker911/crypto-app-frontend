import "./CoinsList.css";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { options } from "../../utils/constants";
import Pagination from "../Pagination/Pagination";
import PreLoader from "../PreLoader/PreLoader";
import { useNavigate, useParams } from "react-router-dom";

const CoinsList = ({
  coins,
  isLoading,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  const { number } = useParams();

  const page = parseInt(number, 10);

  useEffect(() => {
    if (!isNaN(page) && page !== currentPage) {
      onPageChange(page);
    }
    console.log(coins);
  }, [number, currentPage]);

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
    <div className="coin">
      <input
        className="coin__input"
        type="text"
        placeholder="Search for crypto currency"
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <table className="coin__info">
            <thead>
              <tr className="coin__title">
                <th>#</th>
                <th className="th__coin" align="left">
                  Coin
                </th>
                <th className="th__price" align="right">
                  Price
                </th>
                <th className="th__24h" align="right">
                  24h %
                </th>
                <th className="th__cap" align="right">
                  Market Cap
                </th>
                <th className="th__chart">Last 7 Days</th>
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
                    className="coin__stat"
                    onClick={() => navigate(`/${coin.id}`)}
                  >
                    <td className="coin__rank">
                      {coin.market_cap_rank ? coin.market_cap_rank : "-"}
                    </td>

                    <td className="coin__container" align="left">
                      <img
                        className="coin__image"
                        src={coin.image}
                        alt={coin.id}
                      />
                      <div className="coin__name">{coin.name}</div>
                      <div>
                        <div className="coin__symbol">
                          {coin.symbol.toUpperCase()}
                        </div>

                        <div className="coin__cap">
                          {coin.market_cap
                            ? formatNumber(coin.market_cap)
                            : "-"}
                        </div>
                      </div>
                    </td>

                    <td className="coin__props">${coin.current_price}</td>
                    <td
                      className="coin__props coin__24h"
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
                    <td className="coin__props coin__market-cap">
                      {coin.market_cap
                        ? "$" + coin.market_cap.toLocaleString()
                        : "-"}
                    </td>
                    <td className="coin__spark">
                      <Line
                        className="coin__chart"
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
                        className="coin__props props__24h"
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
            <div className="coin__none"> No matches found </div>
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
