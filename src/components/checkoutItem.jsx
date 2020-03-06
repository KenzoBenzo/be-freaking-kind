import React from "react";
import Img from "gatsby-image";
import { Stack, Text } from "@chakra-ui/core";

function CheckoutItem({ id, name, quantity, price, image }) {
  const total = quantity * price;

  const formattedLineTotal = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(total / 100);

  return (
    <Stack
      key={id}
      backgroundColor="gray.800"
      p={4}
      borderRadius="md"
      isInline
      align="center"
      justify="space-between"
      spacing={4}
    >
      <Img
        fluid={image.childImageSharp.fluid}
        alt={name}
        title={name}
        style={{ height: 64, width: 64, borderRadius: 4 }}
      />
      <Text color="white" ml={4} fontSize="sm">
        {name}
      </Text>
      <Text color="white" fontSize="sm">
        x{quantity}
      </Text>
      <Text color="white" fontSize="sm">
        {formattedLineTotal}
      </Text>
    </Stack>
  );
}

export default CheckoutItem;
