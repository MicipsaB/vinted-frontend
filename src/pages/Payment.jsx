import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

// Je me connecte à mon compte Stripe
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  //Je récupère le prix de la prochaine transaction
  const location = useLocation();
  const { title, price } = location.state;

  const options = {
    // Type de la transaction
    mode: "payment",
    // Le montant de la transaction (en centimes)
    amount: Number(((price + price * 0.1 + price * 0.2) * 100).toFixed(0)),
    // Devise de la transaction
    currency: "eur",
  };

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Résumé de la commande</h2>
        <ul>
          <li>
            <span>Commande</span> <span>{price} €</span>
          </li>
          <li>
            <span>Frais de protection acheteurs</span>
            <span>{Number(price * 0.1)} €</span>
          </li>
          <li>
            <span>Frais de port</span>
            <span>{Number(price * 0.2)} €</span>
          </li>
          <li>
            <span>Total</span>
            <span>{Number(price + price * 0.1 + price * 0.2)} €</span>
          </li>
        </ul>

        <p>
          Il ne vous reste plus qu'un étape pour vous offrir{" "}
          <span>{title}</span>
          🌟. Vous allez payer{" "}
          <span>{Number(price + price * 0.1 + price * 0.2)}</span> (frais de
          protection et frais de port inclus).
        </p>

        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm title={title} price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
