import "./Converter.css";
import { useState, useEffect } from "react";

const Converter = ({ coin }) => {
  const [amount, setAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(0);

  const currentPrice = coin?.market_data.current_price.usd;

  const regExp = /^\d*\.?\d*$/;

  useEffect(() => {
    currentPrice && setUsdAmount(currentPrice);
  }, [currentPrice]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (regExp.test(value)) {
      const amountValue = parseFloat(value) || 0;
      setAmount(value);
      setUsdAmount(
        amountValue * currentPrice > 1
          ? (amountValue * currentPrice).toFixed(2)
          : amountValue * currentPrice
      );
    }
  };

  const handleUsdAmountChange = (e) => {
    const value = e.target.value;
    if (regExp.test(value)) {
      const usdValue = parseFloat(value) || 0;
      setUsdAmount(value);
      setAmount(
        usdValue / currentPrice > 1
          ? (usdValue / currentPrice).toFixed(2)
          : usdValue / currentPrice
      );
    }
  };

  return (
    <div className="converter">
      <div className="converter__header">
        {coin?.symbol.toUpperCase()} to USD converter
      </div>
      <div className="converter__body">
        <div className="converter__coin">
          <input
            className="converter__input"
            type="text"
            onChange={handleAmountChange}
            onFocus={(e) => e.target.select()}
            value={amount}
          />
          <span className="converter__symbol">
            {coin?.symbol.toUpperCase()}
          </span>
        </div>
        <div className="converter__usd">
          <input
            className="converter__input"
            onChange={handleUsdAmountChange}
            onFocus={(e) => e.target.select()}
            value={usdAmount}
          />
          <span className="converter__usd-symbol">USD</span>
        </div>
      </div>
    </div>
  );
};

export default Converter;
