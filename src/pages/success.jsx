import React, { useEffect } from "react";
import { navigate } from "gatsby";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";
import { Text, Code } from "@chakra-ui/core";

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
        <SEO pageTitle='Oops!' />
        <Hero text='Oops!' />
        <Text textAlign='center'>You've no business being on this page!</Text>
      </>
    );

  return (
    <>
      <SEO
        pageTitle='Success'
        pageDescription="You've successfully submitted your order! Congrats, and thank you for being kind."
      />
      <Hero text='Thank you for your order!' />

      <Text textAlign='center' fontSize='lg'>
        Please take note of your order reference for your records:{" "}
        <Code variantColor='blue' fontSize='lg'>
          {location.state.orderId}
        </Code>
      </Text>
    </>
  );
}

export default SuccessPage;
