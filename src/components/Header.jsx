import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  return (
    <div className="header-container">
      <div className="header">
        <img src={logo} alt="logo" />

        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}

        <button>Vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
