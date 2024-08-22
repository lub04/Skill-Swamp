import { Link } from "react-router-dom";

import logo from "../../assets/images/handshake-8683757_640.png";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav>
        <Link className="button" to="/">
          Accueil
        </Link>
        <Link className="button" to="utilisateurs">
          Swappers
        </Link>
        <Link className="button" to="utilisateurs">
          Profil
        </Link>
      </nav>
      <div className="title-logo">
        <h1>Skill Swap</h1>
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
}

export default Header;
