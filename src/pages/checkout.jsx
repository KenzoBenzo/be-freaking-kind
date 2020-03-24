import React from "react";
import SEO from "../components/SEO";
import Checkout from "../components/checkout";
import { Hero } from "../components/hero";

function CheckoutPage() {
  return (
    <>
      <SEO
        pageTitle='Checkout'
        pageDescription="You're so close to passing around kindness. All of your order details will be displayed here."
      />
      <Hero text='Checkout.' />
      <Checkout />
    </>
  );
}

export default CheckoutPage;
