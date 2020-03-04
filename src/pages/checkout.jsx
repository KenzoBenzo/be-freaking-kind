import React from "react";
import SEO from "../components/SEO";
import Checkout from "../components/checkout";
import { Hero } from "../components/hero";

function CheckoutPage() {
  return (
    <React.Fragment>
      <SEO pageTitle='Checkout' />
      <Hero text='Checkout.' />
      <Checkout />
    </React.Fragment>
  );
}

export default CheckoutPage;
