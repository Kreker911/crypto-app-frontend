import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ currentPage }) => {
  return (
    <div className="navigation">
      <Link to="/" className="link__style">
        <p className="navigation__home"> Home</p>
      </Link>
      <Link to={`/list/page/${currentPage}`} className="link__style">
        <p className="navigation__market"> Coin List</p>
      </Link>
    </div>
  );
};

export default Navigation;
