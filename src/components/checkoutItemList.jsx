import React, { useContext } from "react";
import { useCart } from "react-use-cart";
import CheckoutItem from "./checkoutItem";
import CheckoutContext from "../context/checkout";
import { StatNumber, StatLabel, Stat, Divider, Stack } from "@chakra-ui/core";

function CheckoutItemList() {
  const { items, cartTotal } = useCart();
  const { orderTotal, shipping, tax } = useContext(CheckoutContext);

  const formatValue = value =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(value / 100);

  return (
    <Stack
      backgroundColor="gray.900"
      p={4}
      borderRadius="md"
      spacing={4}
      color="white"
    >
      {items.map(CheckoutItem)}
      <Stat>
        <StatLabel>Subtotal</StatLabel>
        <StatNumber>{formatValue(cartTotal)}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Tax</StatLabel>
        <StatNumber>{tax ? formatValue(tax) : "-"}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Shipping</StatLabel>
        <StatNumber>{shipping ? formatValue(shipping) : "-"}</StatNumber>
      </Stat>
      <Divider borderColor="gray.800" />
      <Stat>
        <StatLabel>Total</StatLabel>
        <StatNumber>{formatValue(orderTotal)}</StatNumber>
      </Stat>
    </Stack>
  );
}

export default CheckoutItemList;
