import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  //State qui contiendra la data reçue dans la réponse du serveur
  const [data, setData] = useState();

  //State pour savoir si la réponse du serveur est arrivée
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/v2/offers/" + id
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
    <div className="offer-container">
      <div className="inner-offer-container">
        <div className="product-image">
          <img src={data.product_image.secure_url} alt="product_image" />
        </div>
        <div className="product-details">
          <p>{data.price}</p>
          <ul>
            {data.product_details.map((elem) => {
              const keys = Object.keys(elem);
              const key = keys[0];
              return (
                <li>
                  <span>{key}</span>
                  <span>{elem[key]}</span>
                </li>
                // <li>
                //   {elem.MARQUE && (
                //     <div>
                //       <span>MARQUE</span>
                //       <span>{elem.MARQUE}</span>
                //     </div>
                //   )}
                //   {elem.TAILLE && (
                //     <div>
                //       <span>TAILLE</span>
                //       <span>{elem.TAILLE}</span>
                //     </div>
                //   )}
                //   {elem.ETAT && (
                //     <div>
                //       <span>ETAT</span>
                //       <span>{elem.ETAT}</span>
                //     </div>
                //   )}
                //   {elem.COULEUR && (
                //     <div>
                //       <span>COULEUR</span>
                //       <span>{elem.COULEUR}</span>
                //     </div>
                //   )}
                //   {elem.EMPLACEMENT && (
                //     <div>
                //       <span>EMPLACEMENT</span>
                //       <span>{elem.EMPLACEMENT}</span>
                //     </div>
                //   )}
                // </li>
              );
            })}
          </ul>

          <h2>{data.product_name}</h2>
          <p>{data.product_description}</p>

          <div className="owner">
            <img src={data.owner.account.avatar.secure_url} alt="owner" />
            <span>{data.owner.account.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
