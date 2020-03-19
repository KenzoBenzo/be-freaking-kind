import React from "react";
import ProductGrid from "../components/productGrid";
import { Hero } from "../components/hero";
import { graphql } from "gatsby";
import SEO from "../components/SEO";

function IndexPage({
  data: {
    cms: { products }
  }
}) {
  return (
    <>
      <SEO
        pageTitle='Home'
        pageDescription='BeFreakingKind is an apparel company born out of the want to encourage people at the bare minimum, to be good people.'
      />
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
