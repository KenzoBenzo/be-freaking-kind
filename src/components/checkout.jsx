import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { navigate } from "gatsby";

import { CheckoutProvider } from "../context/checkout";
import CheckoutForm from "../components/checkoutForm";
import CheckoutItemList from "./checkoutItemList";

function Checkout() {
  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      const navigateTimer = setTimeout(() => {
        navigate(`/cart`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [isEmpty]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <CheckoutProvider>
      <div>
        <div>
          <div>
            <CheckoutItemList />
          </div>
        </div>
        <div>
          <CheckoutForm />
        </div>
      </div>
    </CheckoutProvider>
  );
}

export default Checkout;
