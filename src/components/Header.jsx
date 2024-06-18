import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ token, handleToken }) => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        <div className="header-buttons">
          {token ? (
            <button
              onClick={() => {
                handleToken(null);
                navigate("/");
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

          <button
            onClick={() => {
              if (token) navigate("/publish");
              else navigate("/login");
            }}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
