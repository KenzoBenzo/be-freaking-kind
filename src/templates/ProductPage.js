import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { useCart } from "react-use-cart";
import queryString from "query-string";
import { navigate } from "@reach/router";
import {
  Heading,
  Text,
  FormLabel,
  Select,
  Button,
  Grid,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Stack,
  Image,
  StatNumber,
  useToast
} from "@chakra-ui/core";
import SEO from "../components/SEO";

function ProductPage({
  data: {
    cms: { product }
  },
  location
}) {
  const toast = useToast();
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
    <>
      <SEO
        pageTitle={product.name}
        pageDescription={product.description.text.substring(0, 260)}
        image={
          activeVariant
            ? activeVariant.variantImage.childImageSharp.fluid.src
            : product.printfulProduct.productImage.childImageSharp.fluid.src
        }
      />

      <Grid
        templateColumns={[
          "repeat(auto-fill, 2fr)",
          "repeat(auto-fill, 2fr)",
          "repeat(2, 2fr)"
        ]}
        gap={16}>
        <Tabs variant='line' borderBottomColor='gray.50'>
          <TabPanels>
            <TabPanel>
              <Img
                fluid={activeVariant.variantImage.childImageSharp.fluid}
                alt={product.name}
                title={product.name}
                style={{ borderRadius: 4, maxHeight: 400 }}
              />
            </TabPanel>
            <TabPanel>
              <Img
                fluid={
                  product.printfulProduct.productImage.childImageSharp.fluid
                }
                alt={product.name}
                title={product.name}
                style={{ borderRadius: 4, maxHeight: 400 }}
              />
            </TabPanel>
            {product.images &&
              product.images.map(image => (
                <TabPanel key={image.id}>
                  <Image
                    src={`https://media.graphcms.com/${image.handle}`}
                    borderRadius='md'
                    h='100%'
                    maxH='400px'
                    m='0 auto'
                  />
                </TabPanel>
              ))}
          </TabPanels>
          <TabList>
            <Tab>
              <Img
                fluid={activeVariant.variantImage.childImageSharp.fluid}
                alt={product.name}
                title={product.name}
                style={{ borderRadius: 4, height: 64, width: 96 }}
              />
            </Tab>
            <Tab>
              <Img
                fluid={
                  product.printfulProduct.productImage.childImageSharp.fluid
                }
                alt={product.name}
                title={product.name}
                style={{ borderRadius: 4, height: 64, width: 96 }}
              />
            </Tab>
            {product.images &&
              product.images.map(image => (
                <Tab key={image.handle}>
                  <Image
                    src={`https://media.graphcms.com/${image.handle}`}
                    borderRadius='md'
                    h={16}
                    maxW={16}
                  />
                </Tab>
              ))}
          </TabList>
        </Tabs>

        <Stack spacing={4}>
          <Heading as='h1'>{product.name}</Heading>

          <StatNumber>
            {activeVariant && activeVariant.formattedPrice}
          </StatNumber>

          {product.description && <Text>{product.description.markdown}</Text>}
          <Stack isInline spacing={4} alignItems='flex-end'>
            <FormLabel htmlFor='style' w='100%'>
              Size
              <Select
                id='style'
                size='sm'
                value={activeVariantId}
                onChange={({ target: { value } }) => setActiveVariantId(value)}>
                {variants.map((variant, index) => (
                  <option key={index} value={variant.id}>
                    {variant.splitName}
                  </option>
                ))}
              </Select>
            </FormLabel>
            <FormLabel htmlFor='quantity' w='100%' pr={0}>
              Quantity
              <Select
                id='quantity'
                size='sm'
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
              </Select>
            </FormLabel>
          </Stack>
          <Button
            w='100%'
            variantColor='red'
            fontWeight='600'
            onClick={() => {
              addItem(
                {
                  id: activeVariant.id,
                  price: activeVariant.retail_price,
                  image: activeVariant.variantImage,
                  name: activeVariant.name,
                  description: product.description.markdown
                },
                variantQuantity
              );
              toast({
                position: "top-right",
                title: "Added to cart!",
                description: `We've added ${activeVariant.name} x${variantQuantity} to your cart.`,
                status: "success",
                duration: 5000,
                isClosable: true,
              })
            }}
            disabled={!activeVariant}>
            Add to cart
          </Button>
        </Stack>
      </Grid>
    </>
  );
}

export const pageQuery = graphql`
  query ProductQuery($id: ID!) {
    cms {
      product(where: { id: $id }) {
        id
        description {
          markdown
          text
        }
        name
        images {
          id
          width
          height
          handle
        }
        printfulProductId
        printfulProduct {
          productImage {
            childImageSharp {
              fluid(maxWidth: 500) {
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
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProductPage;
