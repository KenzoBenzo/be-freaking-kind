import React from "react";
import Layout from "./src/templates/layout";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import customTheme from "./theme/theme";
import { CartProvider } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import "isomorphic-fetch";
import { ToastContainer } from "react-toastify";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import StripeProvider from "./src/components/StripeProvider";

import {
  handleItemAdded,
  handleItemUpdated,
  handleItemRemoved
} from "./src/utils/cart-helpers";

const toastOptions = {
  position: "top-right",
  draggable: false,
  closeButton: false,
  autoClose: 2000
};

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
            onItemAdd={handleItemAdded}
            onItemUpdate={handleItemUpdated}
            onItemRemove={handleItemRemoved}>
            <CSSReset />
            {element}
          </CartProvider>
        </ClientContext.Provider>
        <ToastContainer {...toastOptions} />
      </StripeProvider>
    </ThemeProvider>
  );
};
