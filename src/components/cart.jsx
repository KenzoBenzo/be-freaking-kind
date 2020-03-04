import React from "react";
import { Link } from "gatsby";
import { useCart } from "react-use-cart";

import CartItemList from "./cartItemList";

function Cart() {
  const { isEmpty, cartTotal } = useCart();
  const formattedSubTotal = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(cartTotal / 100);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <React.Fragment>
      <CartItemList />
      <div>
        <div>
          <span>Sub total</span>
          <span>{formattedSubTotal}</span>
        </div>

        <Link to='/checkout'>Checkout</Link>
      </div>
    </React.Fragment>
  );
}

export default Cart;
