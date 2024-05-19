import "./Converter.css";
import { useState, useEffect } from "react";

const Converter = ({ coin }) => {
  const [amount, setAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState();

  const currentPrice = coin?.market_data.current_price.usd;

  const regExp = /^\d*\.?\d*$/;

  useEffect(() => {
    setUsdAmount(currentPrice);
  }, [currentPrice]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (regExp.test(value)) {
      const amountValue = parseFloat(value) || 0;
      setAmount(amountValue);
      setUsdAmount(
        amountValue * currentPrice > 0
          ? (amountValue * currentPrice).toFixed(2)
          : amountValue * currentPrice
      );
    }
  };

  const handleUsdAmountChange = (e) => {
    const value = e.target.value;
    if (regExp.test(value)) {
      const usdValue = parseFloat(value) || 0;
      setUsdAmount(usdValue);
      setAmount(
        usdValue / currentPrice > 0
          ? (usdValue / currentPrice).toFixed(2)
          : usdValue / currentPrice
      );
    }
  };

  return (
    <>
      <div className="converter__header">
        {coin?.symbol.toUpperCase()} to USD converter
      </div>
      <div className="converter__container">
        <div className="converter__coin">
          <input
            className="converter__input"
            type="text"
            placeholder="0"
            onChange={handleAmountChange}
            onFocus={(e) => e.target.select()}
            value={amount}
          />
          <span className="converter__span-coin">
            {coin?.symbol.toUpperCase()}
          </span>
        </div>
        <div className="converter__usd">
          <input
            className="converter__input"
            placeholder="0"
            onChange={handleUsdAmountChange}
            onFocus={(e) => e.target.select()}
            value={usdAmount}
          />
          <span className="converter__span-usd">USD</span>
        </div>
      </div>
    </>
  );
};

export default Converter;
