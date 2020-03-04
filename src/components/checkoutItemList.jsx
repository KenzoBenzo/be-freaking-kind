import React, { useContext } from "react";
import { useCart } from "react-use-cart";

import CheckoutItem from "./checkoutItem";
import CheckoutContext from "../context/checkout";

function CheckoutItemList() {
  const { items, cartTotal } = useCart();
  const { orderTotal, shipping, tax } = useContext(CheckoutContext);

  const formatValue = value =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(value / 100);

  return (
    <div>
      {items.map(CheckoutItem)}
      <div>
        <span>Sub total</span>
        <span>{formatValue(cartTotal)}</span>
      </div>
      <div>
        <span>Tax</span>
        <span>{tax ? formatValue(tax) : "-"}</span>
      </div>
      <div>
        <span>Shipping</span>
        <span>{shipping ? formatValue(shipping) : "-"}</span>
      </div>
      <hr />
      <div>
        <span>Total</span>
        <span>{formatValue(orderTotal)}</span>
      </div>
    </div>
  );
}

export default CheckoutItemList;
