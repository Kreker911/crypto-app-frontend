import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Header = ({ currentPage }) => {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" />
        <h1 className="header__title">Crypto Spotter</h1>
      </div>
      <Navigation currentPage={currentPage} />
    </div>
  );
};

export default Header;
