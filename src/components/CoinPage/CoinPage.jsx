import "./CoinPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoin } from "../../utils/coinApi";
import SideBar from "../SideBar/SideBar";
import CoinInfo from "../CoinInfo/CoinInfo";

const CoinPage = ({ isLoading }) => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);

  useEffect(() => {
    getCoin(id)
      .then((coin) => {
        setCoin(coin);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="coin-page">
      <SideBar coin={coin} />
      <CoinInfo id={id} isLoading={isLoading} coin={coin} />
    </div>
  );
};

export default CoinPage;
