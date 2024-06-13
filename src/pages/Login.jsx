import axios from "axios";
import { useState } from "react";

const Login = () => {
  //On crée les states pour nos inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <form
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

          console.log(response.data);
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
