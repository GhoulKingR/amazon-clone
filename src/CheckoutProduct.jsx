import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({
  index,
  id,
  image,
  title,
  price,
  rating,
  hideButton,
}) {
  const [_, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // remove item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      index,
    });
  };

  return (
    <div className="checkoutProduct">
      <div className="checkoutProject__imageContainer">
        <img src={image} className="checkoutProduct__image" alt="product" />
      </div>

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐️</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
