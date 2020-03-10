import React from "react";
import { Stack } from "@chakra-ui/core";
import customTheme from "../../theme/theme";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

export default function Layout({ children }) {
  return (
    <>
      <Stack
        minH='100vh'
        backgroundColor={customTheme.colors.white}
        py={4}
        px={[4, 4, 8, 12]}>
        <Navigation />
        {children}
        <Footer />
      </Stack>
    </>
  );
}
