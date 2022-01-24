import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface props {
  iconShown?: boolean;
}

const NavButton: FC<props> = ({ children, iconShown = false }) => {
  return (
    <Flex
      cursor="pointer"
      alignItems="center"
      justifyContent="center"
      role="group"
      _hover={{
        color: "gray.700",
      }}
    >
      <Text fontSize="sm" fontWeight={500} letterSpacing={-0.3} mr={1}>
        {children}
      </Text>
      {iconShown && (
        <Icon
          _groupHover={{
            transform: "rotate(180deg)",
            transition: "all 0.3s ease",
          }}
          color="gray.500"
          width={3}
          as={IoIosArrowDown}
        />
      )}
    </Flex>
  );
};

export default NavButton;
