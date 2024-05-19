import "./SideBar.css";
import parse from "html-react-parser";
import { dateOptions } from "../../utils/constants";
import { useMemo } from "react";
import Converter from "../Converter/Converter";

const SideBar = ({ coin, isLoading }) => {
  const price24h = coin?.market_data.price_change_percentage_24h;

  const market24h = coin?.market_data.market_cap_change_percentage_24h;

  const ath = coin?.market_data.ath_change_percentage.usd;

  const atl = coin?.market_data.atl_change_percentage.usd;

  const currentPrice = coin?.market_data.current_price.usd;

  const percentageStyle = useMemo(
    () => (percentage) => ({
      color:
        percentage > 0 ? "#16c784" : percentage == null ? "#fff" : "#ea3943",
    }),
    []
  );

  const formattedDescription = useMemo(
    () =>
      parse(
        `${
          coin?.description.en
            ? coin?.description.en.split(". ")[0] + "."
            : "No description available."
        }`
      ),
    [coin?.description.en]
  );

  return (
    <div className="side__container">
      <img className="side__image" src={coin?.image.large} alt={coin?.name} />

      <div className="name__container">
        <h1 className="side__title">{coin?.name}</h1>
        <p className="side__symbol">{coin?.symbol.toUpperCase()}</p>
      </div>

      <div className="price__container">
        <h2 className="side__price">${currentPrice}</h2>
        <p className="side__price24h" style={percentageStyle(price24h)}>
          {price24h > 0 && "+"}
          {price24h ? price24h.toFixed(2) + "%" : "0%"}
        </p>
      </div>

      {coin?.market_data.low_24h.usd && (
        <>
          <span className="side__range-line"></span>
          <div className="side__range">
            <span> ${coin?.market_data.low_24h.usd}</span>
            <span> 24h Range</span>
            <span> ${coin?.market_data.high_24h.usd}</span>
          </div>
        </>
      )}

      <Converter coin={coin} isLoading={isLoading} />

      <p className="side__description">{formattedDescription}</p>

      <div className="data__container">
        <p>Market cap:</p>
        <div className="market__data">
          <p style={percentageStyle(market24h)}>
            {market24h > 0 && "+"}
            {market24h ? market24h.toFixed(2) + "%" : "0%"}
          </p>
          <p>${coin?.market_data.market_cap.usd.toLocaleString()}</p>
        </div>
      </div>

      <div className="data__container">
        <p>Total supply:</p>
        <p>
          {coin?.market_data.total_supply.toLocaleString()}{" "}
          {coin?.symbol.toUpperCase()}
        </p>
      </div>

      <div className="data__container">
        <p className="data__title">All-time high:</p>

        <p className="data__title">${coin?.market_data.ath.usd}</p>
      </div>

      <div className="data__container">
        <span className="athl">
          {new Date(coin?.market_data.ath_date.eur).toLocaleString(
            "en-US",
            dateOptions
          )}
        </span>

        <span className="atp" style={percentageStyle(ath)}>
          {ath > 0 && "+"}
          {ath && ath.toFixed(2) + "%"}
        </span>
      </div>

      <div className="data__container">
        <p className="data__title">All-time low:</p>
        <p className="data__title">${coin?.market_data.atl.usd}</p>
      </div>

      <div className="data__container">
        <span className="athl">
          {new Date(coin?.market_data.atl_date.eur).toLocaleString(
            "en-US",
            dateOptions
          )}
        </span>

        <span className="athl" style={percentageStyle(atl)}>
          {atl > 0 && "+"}
          {atl && atl.toFixed(2) + "%"}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
