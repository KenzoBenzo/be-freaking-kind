import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import { navigate } from "gatsby";
import { CheckoutProvider } from "../context/checkout";
import CheckoutForm from "../components/CheckoutForm/checkoutForm";
import CheckoutItemList from "./checkoutItemList";
import { Grid, Text } from "@chakra-ui/core";

function Checkout() {
  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      const navigateTimer = setTimeout(() => {
        navigate(`/`);
      }, 2000);

      return () => clearTimeout(navigateTimer);
    }
  }, [isEmpty]);

  if (isEmpty) return <Text textAlign='center'>Your cart is empty.</Text>;

  return (
    <CheckoutProvider>
      <Grid
        templateColumns={["auto-fill", "auto-fill", "2fr 3fr"]}
        gap={6}
        flexWrap='wrap'>
        <CheckoutItemList />
        <CheckoutForm />
      </Grid>
    </CheckoutProvider>
  );
}

export default Checkout;
