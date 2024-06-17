import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  //On crée les states pour nos inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isCkecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h2>S'inscrire</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const dataToPost = {
            email: email,
            username: username,
            password: password,
            newsletter: isCkecked,
          };

          const response = await axios.post(
            "https://lereacteur-vinted-api.herokuapp.com/user/signup",
            dataToPost
          );

          handleToken(response.data.token);

          navigate("/");
        }}
      >
        {/* Username Input  */}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />

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

        {/* Checkbox Input  */}
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isCkecked);
          }}
          checked={isCkecked}
        />
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>

        {/* Submit Button  */}
        <input type="submit" value={"S'inscrire"} />
      </form>
    </div>
  );
};

export default Signup;
