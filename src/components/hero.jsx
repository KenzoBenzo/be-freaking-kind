import React from "react";
import { Box, Heading } from "@chakra-ui/core";

export const Hero = ({ text, children }) => (
  <>
    <Box
      mx="auto"
      backgroundColor="gray.50"
      w="100%"
      py={12}
      borderRadius="md"
      mb={6}
    >
      <Heading as="h1" textAlign="center" fontSize="6xl" fontWeight={900}>
        {text}
      </Heading>
      {children}
    </Box>
  </>
);
