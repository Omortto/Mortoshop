import React, { FC } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "../lib/theme";
import Marquee from "./Marquee";
import Header from "./Header/Header";
import Context from "../context";

//fonts
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/800.css";
import "@fontsource/raleway/200.css";
import "@fontsource/quicksand/600.css";

const Layout: FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Context>
        <Marquee />
        <Header />
        <Container maxW={{ base: "100%", md: "90%" }} m="auto">
          {children}
        </Container>
      </Context>
    </ChakraProvider>
  );
};

export default Layout;
