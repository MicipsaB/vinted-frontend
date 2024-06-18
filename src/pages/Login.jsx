import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  //On crée les states pour nos inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form
        className="login-form"
        onSubmit={async () => {
          event.preventDefault();

          const dataToPost = {
            email: email,
            password: password,
          };

          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/login",
            dataToPost
          );
          handleToken(response.data.token);

          navigate("/");
        }}
      >
        {/* Email Input  */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />

        {/* Password Input  */}
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />

        {/* Submit Button  */}
        <input type="submit" value={"Se connecter"} />
      </form>
    </div>
  );
};

export default Login;
