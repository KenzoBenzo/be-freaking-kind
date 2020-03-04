import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { useCart } from "react-use-cart";
import queryString from "query-string";
import { navigate } from "@reach/router";

// import ReviewsList from "../components/ReviewsList";
import SEO from "../components/SEO";

function ProductPage({
  data: {
    cms: { product }
  },
  location
}) {
  const { variantId } = queryString.parse(location.search);
  const { variants } = product.printfulProduct;
  const [firstVariant] = variants;
  const [variantQuantity, setVariantQuantity] = useState(1);
  const [activeVariantId, setActiveVariantId] = useState(
    variantId || firstVariant.id
  );
  const { addItem } = useCart();

  const activeVariant = variants.find(
    variant => variant.id === activeVariantId
  );

  useEffect(() => {
    navigate(`?variantId=${activeVariantId}`, { replace: true });
  }, [activeVariantId]);

  return (
    <React.Fragment>
      <SEO
        pageTitle={product.name}
        image={
          activeVariant
            ? activeVariant.variantImage.childImageSharp.fluid.src
            : product.printfulProduct.productImage.childImageSharp.fluid.src
        }
      />

      <div>
        <div>
          <div>
            <Img
              fluid={
                activeVariant
                  ? activeVariant.variantImage.childImageSharp.fluid
                  : product.printfulProduct.productImage.childImageSharp.fluid
              }
              alt={product.name}
              title={product.name}
            />
          </div>
        </div>

        <div>
          <h1>{product.name}</h1>

          <div>
            <p>{activeVariant && activeVariant.formattedPrice}</p>
          </div>

          {product.description && (
            <div>
              <p>{product.description.markdown}</p>
            </div>
          )}
          <div>
            <div>
              <label htmlFor='style'>Style</label>

              <div>
                <select
                  id='style'
                  value={activeVariantId}
                  onChange={({ target: { value } }) =>
                    setActiveVariantId(value)
                  }>
                  {variants.map((variant, index) => (
                    <option key={index} value={variant.id}>
                      {variant.splitName}
                    </option>
                  ))}
                </select>

                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor='quantity'>Quantity</label>

              <div>
                <select
                  id='quantity'
                  value={variantQuantity}
                  onChange={({ target: { value } }) =>
                    setVariantQuantity(parseInt(value))
                  }>
                  {new Array(5)
                    .fill(0)
                    .map((v, k) => k + 1)
                    .map(i => ({ value: i, label: i }))
                    .map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </select>

                <div>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() =>
                addItem(
                  {
                    id: activeVariant.id,
                    price: activeVariant.retail_price,
                    image: activeVariant.variantImage,
                    name: activeVariant.name,
                    description: product.description.markdown
                  },
                  variantQuantity
                )
              }
              disabled={!activeVariant}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* <ReviewsList productId={product.id} reviews={product.reviews} /> */}
    </React.Fragment>
  );
}

export const pageQuery = graphql`
  query ProductQuery($id: ID!) {
    cms {
      product(where: { id: $id }) {
        id
        description {
          markdown
        }
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
            id
            formattedPrice
            name
            retail_price
            splitName
            variantImage {
              childImageSharp {
                fluid(maxWidth: 560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        reviews(orderBy: createdAt_DESC) {
          id
          email
          gravatar {
            childImageSharp {
              fluid(maxWidth: 560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          headline
          message
          rating
        }
      }
    }
  }
`;

export default ProductPage;
