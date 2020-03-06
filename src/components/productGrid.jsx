import React from "react";
import { Grid } from "@chakra-ui/core";
import Product from "./product";

function ProductGrid({ products }) {
  if (!products) return null;

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6} flexWrap='wrap'>
      {products.map(Product)}
    </Grid>
  );
}

export default ProductGrid;
