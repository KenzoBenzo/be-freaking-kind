import React, { useEffect } from "react";
import { navigate } from "gatsby";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";

function SuccessPage({ location }) {
  const showSuccessScreen = location.state && location.state.orderId;

  useEffect(() => {
    if (!showSuccessScreen) {
      const navigateTimer = setTimeout(() => {
        navigate(`/`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [showSuccessScreen]);

  if (!showSuccessScreen)
    return (
      <>
        <Hero text="Oops!" />
        <p>You've no business being on this page!</p>
      </>
    );

  return (
    <>
      <SEO pageTitle="Thank you for your order" />
      <Hero text="Thanks!" />

      <p>
        Please take note of your order reference for your records:{" "}
        <span>{location.state.orderId}</span>
      </p>
    </>
  );
}

export default SuccessPage;
