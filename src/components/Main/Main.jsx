import "./Main.css";
import loop from "../../images/loop1.mp4";
import { Link } from "react-router-dom";

const Main = ({ currentPage }) => {
  return (
    <div className="main">
      <video className="main__video" autoPlay loop muted playsInline>
        <source src={loop} type="video/mp4"></source>
      </video>
      <h1 className="main__title">
        Enjoy the expereince <br />
        to the crypto world
      </h1>
      <Link to={`/list/page/${currentPage}`} className="link__style">
        <button className="main__button"> Coin List </button>
      </Link>
    </div>
  );
};

export default Main;
