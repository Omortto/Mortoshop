import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode, SetStateAction, useState } from "react";
import { useUiContext } from "../../context";

interface props {
  children: string;
}

const SearchCatButton: FC<props> = ({ children }) => {
  const { searchCategory, setSearchCategory } = useUiContext();

  const activeHandler = () => {
    if (searchCategory === children) {
      setSearchCategory("");
    } else {
      setSearchCategory(children);
    }
  };

  return (
    <Box
      cursor="pointer"
      onClick={activeHandler}
      fontSize="sm"
      p={2}
      borderRadius="xl"
      fontWeight={500}
      bg={searchCategory === children ? "gray.800" : ""}
      color={searchCategory === children ? "gray.50" : "gray.800"}
    >
      {children}
    </Box>
  );
};
export default SearchCatButton;
