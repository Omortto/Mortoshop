import {
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Drawer,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Navbar from "./Navbar";

const MenuDrawer = () => {
  const btnRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = [
    "Category",
    "Collection",
    "Focus",
    "Service Point 1",
    "Assistance",
    "Contact",
  ];

  return (
    <>
      <Icon w={6} h={6} ref={btnRef} onClick={onOpen} as={AiOutlineMenu} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mortoshop</DrawerHeader>

          <DrawerBody>
            <Flex mt={10} flexDir="column" fontWeight={500} gap={4}>
              {items.map((item) => (
                <Text
                  key={item}
                  bg="gray.100"
                  p={4}
                  borderRadius={10}
                  shadow="sm"
                >
                  {item}
                </Text>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
