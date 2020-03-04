import React from "react";
import ProductGrid from "../components/productGrid";
import { Hero } from "../components/hero";

function IndexPage({
  data: {
    cms: { products }
  }
}) {
  return (
    <>
      <Hero text='Just be fucking kind.' />
      <ProductGrid products={products} />
    </>
  );
}

export const pageQuery = graphql`
  query ProductsQuery {
    cms {
      products {
        id
        name
        printfulProductId
        printfulProduct {
          productImage {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          variants {
            formattedPrice
            retail_price
          }
        }
      }
    }
  }
`;

export default IndexPage;
