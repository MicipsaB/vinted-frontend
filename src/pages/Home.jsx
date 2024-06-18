import heroImg from "../assets/img/hero-img.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  //State qui contiendra la data reçue dans la réponse du serveur
  const [data, setData] = useState();

  //State pour savoir si la réponse du serveur est arrivée
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
      );

      //Je stocke la réponse du serveur dans le state data
      setData(response.data);

      //Je fais passer isLoading à false
      setIsLoading(false);
    };

    //J'appelle la fonction fetchData
    fetchData();
  }, []);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <main>
      <div className="hero-img">
        <img src={heroImg} alt="heroImg" />
      </div>

      {/* -------------Offers Container Starts----------- */}
      <section className="offers-container">
        {data.offers.map((elem) => {
          return (
            <Link key={elem._id} to={"/offer/" + elem._id}>
              <div className="offer">
                <div className="username-avatar">
                  {elem.owner.account.avatar && (
                    <img
                      src={elem.owner.account.avatar.secure_url}
                      alt={elem.owner.account.username}
                    />
                  )}

                  <span>{elem.owner.account.username}</span>
                </div>

                <div className="product-img">
                  <img src={elem.product_image.secure_url} alt="" />
                </div>

                <p>{elem.product_price} €</p>

                {elem.product_details.map((elem) => {
                  return (
                    <div>
                      {elem.TAILLE && <p>{elem.TAILLE}</p>}
                      {elem.MARQUE && <p>{elem.MARQUE}</p>}
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </section>
      {/* -------------Offers Container Ends-------------- */}
    </main>
  );
};

export default Home;
