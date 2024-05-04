import "./CoinList.css";

const CoinList = () => {
  return (
    <div className="coin">
      <h1>Coin List</h1>
      <input
        className="coin__input"
        type="text"
        placeholder="Search for coins"
      ></input>
    </div>
  );
};

export default CoinList;
