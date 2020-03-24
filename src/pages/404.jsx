import React from "react";
import { Text, Button } from "@chakra-ui/core";
import SEO from "../components/SEO";
import { Hero } from "../components/hero";
import { Link } from "gatsby";

const NotFoundPage = () => (
  <React.Fragment>
    <SEO pageTitle='Oops!' />
    <Hero text='Oops!' />
    <Text textAlign='center'>You've no business being on this page!</Text>
    <Link to='/' style={{ margin: "0 auto" }}>
      <Button variantColor='red' mt={4}>
        Go home
      </Button>
    </Link>
  </React.Fragment>
);

export default NotFoundPage;
