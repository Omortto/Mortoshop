import { Flex, Icon, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface props {
  errors: any;
  name: string;
}

const ErrorMsg: FC<props> = ({ errors, name }) => {
  if (errors[name]) {
    return (
      <Flex p={1} gap={1} color="red.500" alignItems="center">
        <Icon as={BiErrorCircle} w={3.5} h={3.5} />
        <Text fontSize="xs">{errors[name]?.message}</Text>
      </Flex>
    );
  } else {
    return null;
  }
};

export default ErrorMsg;
