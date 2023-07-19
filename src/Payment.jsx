import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebaseConfig";
import { collection, doc, setDoc } from "@firebase/firestore";

function Payment() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // generate special stripe secret for charging a customer

    (async () => {
      const response = await axios.post(
        `/payments/create?total=${getBasketTotal(basket) * 100}`
      );
      setClientSecret(response.data.clientSecret);
    })();
  }, [basket]);

  console.log(`The secret is ${clientSecret}`);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // payment intent = payment confirmation
        const userColRef = collection(db, "users");
        const userDocRef = doc(userColRef, user?.uid);
        const ordersColRef = collection(userDocRef, "orders");
        const paymentDocRef = doc(ordersColRef, paymentIntent?.id);
        setDoc(paymentDocRef, {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", {
          replace: true,
        });
      });
  };

  const handleChange = (e) => {
    // Listen to changes in the CardElement
    // display errors as the customer types their details
    setDisabled(e.empty);
    setError(e.error?.message || "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length || 0} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__item">
            {basket.map((item) => (
              <CheckoutProduct {...item} />
            ))}
          </div>
        </div>

        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="$"
                />
                <button disabled={disabled || processing || succeeded}>
                  {processing ? "Processing" : "Buy Now"}
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
