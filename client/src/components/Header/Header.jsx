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
        <Link className="button" to="profil">
          Profil
        </Link>
      </nav>
      <h1>Skill Swap</h1>
      <img src={logo} alt="logo" />
    </header>
  );
}

export default Header;
