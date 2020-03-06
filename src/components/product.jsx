import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Box, Heading, Text, Stack } from "@chakra-ui/core";

function Product({ id, name, printfulProduct, expiryDate }) {
  const [{ formattedPrice }] = printfulProduct.variants;

  return (
    <Link to={`/products/${id}`} key={id}>
      <Box backgroundColor="gray.50" p={4} borderRadius="md" w="100%">
        <Img
          fluid={printfulProduct.productImage.childImageSharp.fluid}
          alt={name}
          title={name}
          style={{ height: 196, borderRadius: 4 }}
        />
        <Heading as="h4" fontSize="1" textAlign="center" mt={4} mb={6}>
          {name}
        </Heading>
        <Stack isInline justify="space-between">
          <Text>Expires: {expiryDate ? expiryDate : "Never"}</Text>
          <Text>{formattedPrice}</Text>
        </Stack>
      </Box>
    </Link>
  );
}

export default Product;
