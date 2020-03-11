import React, { useState } from "react";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";
import {
  IconButton,
  Collapse,
  Box,
  Heading,
  Flex,
  DarkMode
} from "@chakra-ui/core";

const FAQPage = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <SEO pageTitle='FAQ' />
      <Hero text='FAQ' />
      <Box backgroundColor='gray.50' p={4} borderRadius='md'>
        <Flex justify='space-between' alignItems='center'>
          <Heading as='h4' fontSize='xl'>
            Are there any discounts / coupon codes
          </Heading>
          <IconButton
            variant='ghost'
            icon={show === true ? "chevron-up" : "chevron-down"}
            onClick={() => setShow(!show)}
          />
        </Flex>
        <Collapse mt={4} isOpen={show}>
          We do not currently offer any discounts.
        </Collapse>
      </Box>
    </>
  );
};

export default FAQPage;
