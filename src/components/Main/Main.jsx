import "./Main.css";
import loop from "../../images/loop.mp4";
import { Link } from "react-router-dom";

const Main = ({ currentPage }) => {
  return (
    <>
      <video className="main__video" autoPlay loop muted playsInline>
        <source src={loop} type="video/mp4"></source>
      </video>
      <div className="main">
        <h1 className="main__title">
          Enjoy the expereince <br />
          to the crypto world
        </h1>
        <Link to={`/list/page/${currentPage}`} className="main__link">
          Coin List
        </Link>
      </div>
    </>
  );
};

export default Main;
