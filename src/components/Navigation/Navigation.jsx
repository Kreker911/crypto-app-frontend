import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/" style={{ textDecoration: "none" }}>
        <p className="navigation__home"> Home</p>
      </Link>
      <Link to="/list" style={{ textDecoration: "none" }}>
        <p className="navigation__market"> Market</p>
      </Link>
    </div>
  );
};

export default Navigation;
