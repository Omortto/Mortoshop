import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import React, { FC } from "react";
import { BsSearch, BsFilterRight } from "react-icons/bs";
import { useDataContext, useUiContext } from "../../context";

import SearchCatButton from "./SearchCatButton";

const SearchInput: FC = () => {
  const { categories } = useDataContext();
  const { setSearchCategory, searchCategory } = useUiContext();

  return (
    <Flex mt={5} alignItems="center">
      <Flex
        mr={3}
        px={4}
        py={2}
        w="full"
        borderRadius="3xl"
        alignItems="center"
        border="1px"
        borderColor="gray.200"
        transition="all 0.3s ease"
        _focusWithin={{
          borderColor: "gray.600",
        }}
      >
        <Input
          px={4}
          size="full"
          placeholder="Write something..."
          _focus={{}}
          border="none"
        />
        <Flex
          px={4}
          w="min"
          alignItems="center"
          experimental_spaceX={2}
          flexDirection="row"
          display={{ base: "none", lg: "flex" }}
        >
          <SearchCatButton>All</SearchCatButton>

          {categories.map((category) => (
            <SearchCatButton key={category.id}>{category.name}</SearchCatButton>
          ))}
        </Flex>

        <Menu>
          <MenuButton display={{ lg: "none" }} mt={1} as={Box}>
            <Icon color="gray.500" w={7} h={7} as={BsFilterRight} />
          </MenuButton>
          <MenuList onChange={(value) => console.log(value)}>
            <MenuItem onClick={() => setSearchCategory("All")} value="All">
              All
            </MenuItem>
            {categories.map((category) => (
              <MenuItem
                onClick={() => setSearchCategory(category.name)}
                key={category.id}
                value={category.name}
              >
                {category.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Button
        bg="gray.800"
        color="gray.100"
        w={10}
        h={10}
        p={7}
        _active={{
          backgroundColor: "gray.900",
        }}
        _hover={{
          backgroundColor: "gray.800",
        }}
        borderRadius="full"
      >
        <Icon w={5} h={5} as={BsSearch} />
      </Button>
    </Flex>
  );
};

export default SearchInput;
