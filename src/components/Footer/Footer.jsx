import "./Footer.css";
import gitHub from "../../images/git.svg";
import linkedIn from "../../images/linkedin.svg";
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
          className="footer__tripleten"
          target="_blank"
        >
          TripleTen
        </Link>

        <Link
          to="https://github.com/ilyamukhamedov"
          className="footer__github"
          target="_blank"
        >
          <img className="footer__logo" src={gitHub} alt="GitHub logo" />
        </Link>

        <Link
          to="https://www.linkedin.com/in/ilya-mukhamedov"
          className="footer__linkedin"
          target="_blank"
        >
          <img className="footer__logo" src={linkedIn} alt="LinkedIn logo" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
