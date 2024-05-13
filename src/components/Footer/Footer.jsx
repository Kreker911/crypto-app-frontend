import "./Footer.css";
import gitHub from "../../images/git.png";
import linkedIn from "../../images/linkedin.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">
        © 2024 Crypto Spotter, Powered by Ilya Mukhamedov
      </p>
      <div className="footer__social">
        <Link
          to="https://tripleten.co.il/?from=us"
          className="footer__link"
          target="blank"
        >
          Triple Ten
        </Link>

        <Link
          to="https://github.com/Kreker911"
          className="footer__git"
          target="blank"
        >
          <img className="footer__images" src={gitHub} alt="GitHub" />
        </Link>

        <Link
          to="https://www.linkedin.com/in/ilya-mukhamedov"
          className="footer__in"
          target="blank"
        >
          <img className="footer__images" src={linkedIn} alt="LinkedIn" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
