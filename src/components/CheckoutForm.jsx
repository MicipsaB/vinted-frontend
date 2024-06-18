import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState("");
  // State qui gère le fait que le paiement a été effectué
  const [success, setSuccess] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isPaying, setIsPaying] = useState(false);

  // Va me servir à faire une requête à stripe pour faire le paiement
  const stripe = useStripe();
  //   Va me permettre de récupérer le contenu du PaymentElement
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On commence à payer, on désactive le bouton
    setIsPaying(true);
    try {
      // Si il y a un problème avec elements on avorte la transaction
      if (elements == null) {
        return;
      }
      //   On fait une requête à Stripe pour vérifier si tout est bon dans les inputs, on destructure la clef error de la réponse et on la renomme submitError
      const { error: submitError } = await elements.submit();

      // Affiche l'erreur en question
      if (submitError) {
        // console.log(submitError);
        setErrorMessage(submitError.message);
        return;
      }

      // Demande au backend de créer l'intention de paiement, il nous renvoie le clientSecret
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        { title: title, amount: price }
      );
      //   console.log(response.data.client_secret);
      const clientSecret = response.data.client_secret;

      // Requête à Stripe pour valider le paiement
      const { error, paymentIntent } = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements: elements,
        clientSecret: clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirections
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (error) {
        setErrorMessage(error.message);
      }

      // Si on reçois un status succeeded on fais passer success à true
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }

      //   console.log(stripeResponse);
    } catch (error) {
      console.log(error);
    }
    // On a fini de charger
    setIsPaying(false);
  };

  return success ? (
    <p>Merci pour votre achat !</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || isPaying}>Payer</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
