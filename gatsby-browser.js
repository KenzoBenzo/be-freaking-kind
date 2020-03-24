import React from "react";
import Layout from "./src/templates/layout";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "./theme/theme";
import { CartProvider } from "react-use-cart";
import "isomorphic-fetch";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import StripeProvider from "./src/components/StripeProvider";

const randomCartId = () =>
  Math.random()
    .toString(36)
    .substring(7);

const client = new GraphQLClient({
  url: "/.netlify/functions/graphql"
});

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <StripeProvider>
        <ClientContext.Provider value={client}>
          <CartProvider
            id={randomCartId()}
            // onItemAdd={handleItemAdded}
            // onItemUpdate={() =>
            //   useToast({
            //     position: "top-right",
            //     title: "Success!",
            //     description: "Item updated!",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true
            //   })
            // }
            // onItemRemove={() =>
            // useToast({
            //   position: "top-right",
            //   title: "Success!",
            //   description: "Removed from cart.",
            //   status: "success",
            //   duration: 5000,
            //   isClosable: true
            // })}
          >
            <CSSReset />
            {element}
          </CartProvider>
        </ClientContext.Provider>
      </StripeProvider>
    </ThemeProvider>
  );
};
