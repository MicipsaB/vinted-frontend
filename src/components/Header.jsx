import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <img src={logo} alt="logo" />
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
