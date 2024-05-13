import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import PreLoader from "../PreLoader/PreLoader";
import CoinPage from "../CoinsPage/CoinsPage";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchCoins } from "../../utils/coinApi";
import { set } from "lodash";
import CoinsPage from "../CoinsPage/CoinsPage";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 45;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchCoins(currentPage)
      .then((data) => {
        setCoins(data);
      })
      .catch(console.error);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentPage]);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/list"
          element={
            <CoinsPage
              coins={coins}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
      </Routes>

      <Footer />
    </>
  );
}
