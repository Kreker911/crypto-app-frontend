import "./Header.css";
import { Link } from "react-router-dom";
import logoWhite from "../../images/Logo-white.svg";
import logoGreen from "../../images/Logo-green.svg";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";

const Header = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img
            className="header__logo"
            src={isHover ? logoGreen : logoWhite}
            alt="logo"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          />
        </Link>
        <h1 className="header__title">Crypto Spotter</h1>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
