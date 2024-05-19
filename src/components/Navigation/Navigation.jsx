import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/" className="link__style">
        <p className="navigation__home"> Home</p>
      </Link>
      <Link to="/list" className="link__style">
        <p className="navigation__market"> Coin List</p>
      </Link>
    </div>
  );
};

export default Navigation;
