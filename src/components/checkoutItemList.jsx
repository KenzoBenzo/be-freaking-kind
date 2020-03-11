import React, { useContext } from "react";
import { useCart } from "react-use-cart";
import CheckoutItem from "./checkoutItem";
import CheckoutContext from "../context/checkout";
import {
  StatNumber,
  StatLabel,
  Stat,
  Divider,
  Stack,
  Box
} from "@chakra-ui/core";

function CheckoutItemList() {
  const { items, cartTotal } = useCart();
  const { orderTotal, shipping, tax } = useContext(CheckoutContext);

  const formatValue = value =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value / 100);

  return (
    <Box>
      <Stack
        backgroundColor='gray.900'
        p={4}
        borderRadius='md'
        spacing={4}
        color='white'>
        {items.map(CheckoutItem)}
        <Stat mt={8}>
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
        <Divider borderColor='gray.800' />
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber>{formatValue(orderTotal)}</StatNumber>
        </Stat>
      </Stack>
    </Box>
  );
}

export default CheckoutItemList;
