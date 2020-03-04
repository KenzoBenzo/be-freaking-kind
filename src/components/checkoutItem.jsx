import React from "react";
import Img from "gatsby-image";
import { Flex, Text } from "@chakra-ui/core";

function CheckoutItem({ id, name, quantity, price, image }) {
  const total = quantity * price;

  const formattedLineTotal = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR"
  }).format(total / 100);

  return (
    <Flex
      key={id}
      justifyContent='space-between'
      align='center'
      backgroundColor='gray.900'
      py={4}
      px={4}
      borderRadius='md'
      mb={4}>
      <div>
        <Img
          fluid={image.childImageSharp.fluid}
          alt={name}
          title={name}
          style={{ height: 80, width: 200, borderRadius: 4, marginBottom: 16 }}
        />
        <Text color='white'>quantity: {quantity}</Text>
      </div>
      <Text color='white'>{name}</Text>
      <Text color='white'>{formattedLineTotal}</Text>
    </Flex>
  );
}

export default CheckoutItem;
