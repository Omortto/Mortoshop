import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import React, { FC } from "react";

interface props {
  product: Product;
}

const TitleInfoBar: FC<props> = ({ product }) => {
  const descriptionHtml = () => {
    return { __html: product.description };
  };

  return (
    <Flex
      w={{ base: "100%", lg: "25%" }}
      flexDir="column"
      borderRight={{ base: "none", lg: "1px" }}
      borderColor="gray.300"
      pr={{ base: 0, lg: 10 }}
      order={{ base: 2, lg: 1 }}
      py={{ base: 30, lg: 20 }}
    >
      <Heading fontWeight={600} fontSize="4xl" as="h1">
        {product.name}
      </Heading>
      <Text
        mt={{ base: 2, lg: 10 }}
        fontFamily="Quicksand"
        fontSize={["3xl", "4xl", "5xl"]}
        fontWeight={800}
      >
        {product.price.formatted_with_symbol}
      </Text>
      <Box
        fontSize={["md", "sm"]}
        color="gray.600"
        mt={10}
        dangerouslySetInnerHTML={descriptionHtml()}
      ></Box>
    </Flex>
  );
};

export default TitleInfoBar;
