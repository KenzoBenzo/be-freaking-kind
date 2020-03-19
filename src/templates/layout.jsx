import React from "react";
import { Stack } from "@chakra-ui/core";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

export default function Layout({ children }) {
  return (
    <>
      <Stack
        minH='100vh'
        backgroundColor='white'
        pt={4}
        pb={20}
        px={[4, 4, 8, 12]}
        pos='relative'>
        <Navigation />
        {children}
        <Footer />
      </Stack>
    </>
  );
}
