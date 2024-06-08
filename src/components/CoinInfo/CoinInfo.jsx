import "./CoinInfo.css";
import { useState, useEffect, useRef } from "react";
import { fetchCoinHistory } from "../../utils/coinApi";
import PreLoader from "../PreLoader/PreLoader";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../utils/constants";
import hexToRgba from "hex-to-rgba";

const CoinInfo = ({ id, isLoading, coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const chartRef = useRef(null);

  const percentage24h = coin?.market_data.price_change_percentage_24h;
  const percentage7d = coin?.market_data.price_change_percentage_7d;
  const percentage30d = coin?.market_data.price_change_percentage_30d;
  const percentage1y = coin?.market_data.price_change_percentage_1y;

  useEffect(() => {
    fetchCoinHistory(id, days)
      .then((data) => {
        setHistoricalData(data?.prices);
      })
      .catch(console.error);
  }, [id, days]);

  const setColor = () => {
    switch (days) {
      case 1:
        return percentage24h > 0 ? "#16c784" : "#ea3943";
      case 7:
        return percentage7d > 0 ? "#16c784" : "#ea3943";
      case 30:
        return percentage30d > 0 ? "#16c784" : "#ea3943";
      case 365:
        return percentage1y > 0 ? "#16c784" : "#ea3943";
      default:
        return "#fff";
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  };

  const createGradient = (ctx, chartArea) => {
    const colorTop = hexToRgba(setColor(), 0.2);
    const colorBottom = hexToRgba(setColor(), 0);
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, colorTop);
    gradient.addColorStop(1, colorBottom);

    return gradient;
  };

  return (
    <div className="coin-info">
      {isLoading ? (
        <PreLoader />
      ) : (
        <>
          <Line
            ref={chartRef}
            data={{
              labels:
                historicalData &&
                historicalData.map((item) => {
                  const date = new Date(item[0]);
                  let day = date.getDate();
                  let month = date.toString().split(" ")[1];

                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")} PM`
                      : `${date.getHours()}:${date
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")} AM`;
                  return days == 1 ? time : `${day} ${month}`;
                }),
              datasets: [
                {
                  data: historicalData && historicalData.map((item) => item[1]),
                  label: `Price`,
                  borderColor: setColor(),
                  borderWidth: 2,
                  tension: 0.5,
                  fill: true,
                  backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                      return null;
                    }
                    return createGradient(ctx, chartArea);
                  },
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: (context) => {
                      const tooltipItem = context[0];
                      const date = new Date(
                        historicalData[tooltipItem.dataIndex][0]
                      );
                      let day = date.getDate();
                      let month = date.toString().split(" ")[1];
                      let year = date.getFullYear();
                      let time =
                        date.getHours() > 12
                          ? `${date.getHours() - 12}:${date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")} PM`
                          : `${date.getHours()}:${date
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")} AM`;
                      return `${day} ${month} ${year}      ${time}`;
                    },
                    label: (context) => {
                      return `Price: $${
                        context.parsed.y < 1
                          ? context.parsed.y.toFixed(8)
                          : context.parsed.y.toFixed(2)
                      }`;
                    },
                    usePointStyle: true,
                  },
                  boxWidth: 0,
                  boxHeight: 0,
                },
              },

              scales: {
                y: {
                  position: "right",
                  grid: {
                    color: "#fff",
                    lineWidth: 0.1,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    callback: (value) => {
                      return `$${
                        value >= 1 ? formatNumber(value) : value.toFixed(8)
                      }`;
                    },
                    align: "end",
                    font: { size: 10 },
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    maxTicksLimit: 8,
                    align: "start",
                    font: { size: 10 },
                  },
                },
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
              animation: {
                duration: 0,
              },
              elements: {
                point: {
                  radius: 0,
                  hoverRadius: 8,
                },
              },
            }}
          />
          <div className="coin-info__button">
            {chartDays.map((day) => (
              <button
                className={`coin-info__days ${
                  day.value == days ? "active" : ""
                }`}
                key={day.value}
                onClick={() => setDays(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
      <table className="coin-info__table">
        <thead className="coin-info__header ">
          <tr>
            <th>24h</th>
            <th>7d</th>
            <th>30d</th>
            <th>1y</th>
          </tr>
        </thead>
        <tbody>
          <tr className="coin-info__row">
            <td
              style={
                percentage24h > 0
                  ? { color: "#16c784" }
                  : percentage24h == 0
                  ? { color: "#fff" }
                  : { color: "#ea3943" }
              }
            >
              {percentage24h > 0 && "+"}
              {percentage24h ? percentage24h.toFixed(1) + "%" : "-"}
            </td>
            <td
              style={
                percentage7d > 0
                  ? { color: "#16c784" }
                  : percentage7d == 0
                  ? { color: "#fff" }
                  : { color: "#ea3943" }
              }
            >
              {percentage7d > 0 && "+"}
              {percentage7d ? percentage7d.toFixed(1) + "%" : "-"}
            </td>
            <td
              style={
                percentage30d > 0
                  ? { color: "#16c784" }
                  : percentage30d == 0
                  ? { color: "#fff" }
                  : { color: "#ea3943" }
              }
            >
              {percentage30d > 0 && "+"}
              {percentage30d ? percentage30d.toFixed(1) + "%" : "-"}
            </td>
            <td
              style={
                percentage1y > 0
                  ? { color: "#16c784" }
                  : percentage1y == 0
                  ? { color: "#fff" }
                  : { color: "#ea3943" }
              }
            >
              {percentage1y > 0 && "+"}
              {percentage1y ? percentage1y.toFixed(1) + "%" : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CoinInfo;
