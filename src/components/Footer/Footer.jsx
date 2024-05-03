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
          style={{ textDecoration: "none", color: "inherit" }}
          target="blank"
        >
          <p className="footer__link">Triple Ten</p>
        </Link>

        <Link
          to="https://github.com/Kreker911"
          style={{ textDecoration: "none", color: "inherit" }}
          target="blank"
        >
          <img className="footer__git" src={gitHub} alt="GitHub" />
        </Link>

        <Link
          to="https://www.linkedin.com/in/ilya-mukhamedov"
          style={{ textDecoration: "none", color: "inherit" }}
          target="blank"
        >
          <img className="footer__in" src={linkedIn} alt="LinkedIn" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
