import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  useDisclosure,
  DrawerCloseButton,
  IconButton,
  Flex,
  VStack,
  Divider,
  Container,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { useDataContext } from "../../context";
import CartItemCard from "./CartItemCard";

const CartDrawer: FC = () => {
  const size = useBreakpointValue({ base: "full", lg: "md" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useDataContext();

  const router = useRouter();

  const routeToCheckout = () => {
    router.push("/checkout");
    onClose();
  };

  return (
    <>
      <Icon onClick={onOpen} cursor="pointer" mb={1} as={BsCart4} w={6} h={6} />
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader>
            <Flex justifyContent="space-between">
              <HStack>
                <Icon h={6} w={6} as={BsCart4} />
                <Text>Cart</Text>
              </HStack>

              <IconButton
                onClick={onClose}
                aria-label="drawer-close-btn"
                icon={<Icon w={5} h={5} as={AiOutlineClose} />}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            {cart && cart.line_items.length <= 0 && (
              <Text textAlign="center">No item to show</Text>
            )}
            <VStack>
              {cart?.line_items.map((item) => (
                <CartItemCard key={item.id} cartItem={item} />
              ))}

              <Divider p={4} w="full" />
              <Flex
                w="full"
                justifyContent="space-between"
                alignItems="center"
                p={4}
              >
                <Text>Subtotal:</Text>
                <Text fontFamily="Quicksand" fontSize="2xl">
                  {cart?.subtotal.formatted_with_symbol}
                </Text>
              </Flex>
              <Button onClick={routeToCheckout} w="full">
                Checkout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
