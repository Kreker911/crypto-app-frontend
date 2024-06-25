import "./Main.css";
import loop from "../../images/loop.mp4";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Main = ({ currentPage }) => {
  return (
    <>
      <div className="main">
        <Spline
          className="main__video"
          scene="https://prod.spline.design/BatVKG7XOez-cmn1/scene.splinecode"
        />
        {/* <video className="main__video" autoPlay loop muted playsInline>
        <source src={loop} type="video/mp4"></source>
      </video> */}
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
