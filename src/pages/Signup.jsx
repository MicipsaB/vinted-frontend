import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
  //On crée les states pour nos inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isCkecked, setIsChecked] = useState(false);

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
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
            setIsChecked(!checked);
          }}
          checked={isCkecked}
        />
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes et
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <input type="submit" value={"S'inscrire"} />
      </form>
    </div>
  );
};

export default Signup;
