import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";

const SearchBar = () => {
  return (
    <Flex mt={12} flexDir="column">
      <Heading letterSpacing={-1} color="gray.700" fontSize="5xl" as="h2">
        MORTO* Search
      </Heading>
      <SearchInput />
    </Flex>
  );
};

export default SearchBar;
