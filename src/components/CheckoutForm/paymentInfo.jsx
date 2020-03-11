import React from "react";
import { Code, Text } from "@chakra-ui/core";

function PaymentInfo() {
  return (
    <Text>
      This is a <Text as='strong'>test checkout</Text>. You can simulate
      transactions using any valid expiry date, CVC code and{" "}
      <Code variantColor='blue'>4242 4242 4242 4242</Code>, or{" "}
      <Code variantColor='blue'>4000 0000 0000 3220</Code> if you want trigger
      3D Secure 2 authentication.
    </Text>
  );
}

export default PaymentInfo;
