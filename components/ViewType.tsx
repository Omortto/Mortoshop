import {
  Button,
  Container,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDataContext, useUiContext } from "../context";
import { AiOutlineDown, AiOutlineFieldTime } from "react-icons/ai";

const ViewType = () => {
  const { productCount } = useDataContext();
  const { isGridView, setIsGridView } = useUiContext();

  return (
    <Flex
      mt={2}
      px={2}
      py={3}
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      fontSize="sm"
    >
      <Text color="gray.500">
        <span style={{ fontFamily: "sans-serif" }}>{productCount}</span>{" "}
        Products found
      </Text>
      <Flex fontWeight={600} experimental_spaceX={4}>
        <Text
          cursor="pointer"
          onClick={() => setIsGridView(true)}
          color={isGridView ? "gray.800" : "gray.400"}
        >
          Grid View
        </Text>
        <Text
          cursor="pointer"
          onClick={() => setIsGridView(false)}
          color={!isGridView ? "gray.800" : "gray.400"}
        >
          List View
        </Text>
        <Menu isLazy>
          <MenuButton display="flex" alignItems="center" as={Text}>
            Sort <Icon as={AiOutlineDown} />
          </MenuButton>
          <MenuList>
            <MenuItem display="flex" alignItems="center">
              <Icon mr={2} w={5} h={5} as={AiOutlineFieldTime} />
              Latest
            </MenuItem>
            <MenuItem display="flex" alignItems="center">
              <Icon mr={2} w={5} h={5} as={AiOutlineFieldTime} />
              Price (High to Low)
            </MenuItem>
            <MenuItem display="flex" alignItems="center">
              <Icon mr={2} w={5} h={5} as={AiOutlineFieldTime} />
              Price (Low to High)
            </MenuItem>
            <MenuItem display="flex" alignItems="center">
              <Icon mr={2} w={5} h={5} as={AiOutlineFieldTime} />
              Old to New
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default ViewType;
