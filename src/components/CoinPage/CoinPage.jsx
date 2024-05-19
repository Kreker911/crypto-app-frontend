import "./CoinPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin } from "../../utils/coinApi";
import SideBar from "../SideBar /SideBar";

const CoinPage = () => {
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
      <h1>hello wolrd</h1>
    </div>
  );
};

export default CoinPage;
