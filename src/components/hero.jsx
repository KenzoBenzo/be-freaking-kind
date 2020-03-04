import React from "react";
import { Box, Heading } from "@chakra-ui/core";

export const Hero = ({ text }) => (
  <>
    <Box
      mx='auto'
      backgroundColor='gray.50'
      w='100%'
      py={16}
      borderRadius='md'
      mb={6}>
      <Heading as='h1' textAlign='center'>
        {text}
      </Heading>
    </Box>
  </>
);
