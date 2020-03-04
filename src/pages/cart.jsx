import React from "react";
import Cart from "../components/cart";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";

function CartPage() {
  return (
    <React.Fragment>
      <SEO pageTitle='Cart' />
      <Hero text='Cart.' />
      <Cart />
    </React.Fragment>
  );
}

export default CartPage;
