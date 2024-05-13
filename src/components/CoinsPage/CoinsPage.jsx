import "./CoinsPage.css";
import { useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { options } from "../../utils/constants";
import Pagination from "../Pagination/Pagination";
import PreLoader from "../PreLoader/PreLoader";
import { useNavigate } from "react-router-dom";

const CoinsPage = ({
  coins,
  isLoading,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

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
                <th
                  style={{
                    width: "450px",
                    paddingLeft: "30px",
                  }}
                  align="left"
                >
                  Coin
                </th>
                <th>Price</th>
                <th style={{ paddingLeft: "7px" }}>24h %</th>
                <th>Market Cap</th>
                <th>Last 7 Days</th>
              </tr>
            </thead>

            <tbody>
              {handleSearch().map((coin) => {
                const percentage = coin.price_change_percentage_24h;
                return (
                  <tr
                    key={coin.id}
                    className="coin__stat"
                    onClick={() => navigate(`/list/coin/${coin.id}`)}
                  >
                    <td className="coin__props">
                      {coin.market_cap_rank ? coin.market_cap_rank : "-"}
                    </td>
                    <td className="coin__container">
                      <img
                        className="coin__image"
                        src={coin.image}
                        alt={coin.id}
                      />
                      <div className="coin__name">{coin.name}</div>
                      <div className="coin__props coin__symbol">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </td>
                    <td className="coin__props">${coin.current_price}</td>
                    <td
                      className="coin__props"
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
                    <td className="coin__props">
                      {coin.market_cap
                        ? "$" + coin.market_cap.toLocaleString()
                        : "-"}
                    </td>
                    <td className="coin__spark">
                      <Line
                        style={{
                          width: "160px",
                          height: "70px",
                          padding: "10px",
                        }}
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default CoinsPage;
