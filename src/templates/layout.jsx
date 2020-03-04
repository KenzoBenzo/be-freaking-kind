import React from "react"
import { Stack } from "@chakra-ui/core"
import customTheme from "../../theme/theme"
import Navigation from "../components/navigation"

export default function Layout({ children }) {
  return (
    <>
      <Stack minH="100vh" backgroundColor={customTheme.colors.white} py={4} px={8}>
        <Navigation />
        {children}
      </Stack>
    </>
  )
}
