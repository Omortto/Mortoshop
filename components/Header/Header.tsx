import {
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useScreen from "../../lib/useMediaQuery";
import MenuDrawer from "./Drawer";
import Navbar from "./Navbar";
import { BsCart4 } from "react-icons/bs";
import CartDrawer from "../Cart/CartDrawer";

function Header() {
  const router = useRouter();
  const { isLargerThanTab } = useScreen();

  const routeToHome = () => {
    router.push("/");
  };

  return (
    <Flex borderBottom="1px" borderColor="gray.200" p={4}>
      <Flex alignItems="center" justifyContent="space-between" w="90%" m="auto">
        <Heading
          onClick={routeToHome}
          cursor="pointer"
          as="h2"
          letterSpacing={3}
          fontWeight={600}
          fontSize="xl"
        >
          Mortoshop
        </Heading>

        <Flex display={{ base: "none", lg: "flex" }} ml={16} flex={1} gap={2}>
          <Navbar />
        </Flex>

        <Flex alignItems="center" gap={{ base: 6, lg: 3 }}>
          <CartDrawer />
          {!isLargerThanTab && <MenuDrawer />}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
