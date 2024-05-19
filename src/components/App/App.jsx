import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import CoinsList from "../CoinsList/CoinsList";
import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { fetchCoins } from "../../utils/coinApi";
import CoinPage from "../CoinPage/CoinPage";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 133;

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
      <Header currentPage={currentPage} />
      <Routes>
        <Route exact path="/" element={<Main currentPage={currentPage} />} />
        <Route
          path="/list/page/:number"
          element={
            <CoinsList
              coins={coins}
              isLoading={isLoading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route path="/:id" element={<CoinPage />} />
      </Routes>

      <Footer />
    </>
  );
}
