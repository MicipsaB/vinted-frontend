import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";
import { useState } from "react";

import Header from "./components/Header";

//Import pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    //Router contient tout le site
    <Router>
      {/* Le Header apparait sur toutes les pages  */}
      <Header token={token} handleToken={handleToken} />

      {/* LE composant Routes contient toutes mes routes  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
