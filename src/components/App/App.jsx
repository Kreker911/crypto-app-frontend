import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PreLoader from "../PreLoader/PreLoader";
import CoinList from "../CoinList/CoinList";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchCoins } from "../../utils/coinApi";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCoins()
      .then((data) => {
        console.log(data);
        setCoins(data);
      })
      .catch(console.error)
      .finally(setIsLoading(false));
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <PreLoader />
      ) : (
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* <Route exact path="/">
          <Main />
        </Route> */}
          <Route path="/list" element={<CoinList />} />
          {/* <Route path="/list">
          <CoinList />
        </Route> */}
        </Routes>
      )}
      <Footer />
    </>
  );
}
