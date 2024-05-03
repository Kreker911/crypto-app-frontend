import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/Logo-white.svg";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <h1 className="header__title">Crypto Spotter</h1>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
