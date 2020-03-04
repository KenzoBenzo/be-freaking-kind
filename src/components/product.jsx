import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Box } from "@chakra-ui/core";

function Product({ id, name, printfulProduct }) {
  const [{ formattedPrice }] = printfulProduct.variants;

  return (
    <Box key={id} backgroundColor='gray.50' p={4} borderRadius='md' w='100%'>
      <Link to={`/products/${id}`}>
        <div>
          <Img
            fluid={printfulProduct.productImage.childImageSharp.fluid}
            alt={name}
            title={name}
          />

          <div>
            <p>{name}</p>
            <p>{formattedPrice}</p>
          </div>
        </div>
      </Link>
    </Box>
  );
}

export default Product;
