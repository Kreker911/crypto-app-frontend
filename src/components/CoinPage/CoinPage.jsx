import "./CoinPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin } from "../../utils/coinApi";
import SideBar from "../SideBar/SideBar";
import CoinInfo from "../CoinInfo/CoinInfo";

const CoinPage = ({ isLoading }) => {
  const { id } = useParams();

  const [coin, setCoin] = useState();

  useEffect(() => {
    fetchCoin(id)
      .then((coin) => {
        setCoin(coin);
      })
      .catch(console.error);
  }, [id]);

  return (
    <div className="page__container">
      <SideBar coin={coin} />
      <CoinInfo id={id} isLoading={isLoading} coin={coin} />
    </div>
  );
};

export default CoinPage;
