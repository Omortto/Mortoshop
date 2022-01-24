import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import NextImage from "next/image";
import React, { FC } from "react";
import VariantBar from "./Details/VariantBar";

interface props {
  product: Product;
  onClick: () => void;
}

const ListProductCard: FC<props> = ({ product, onClick }) => {
  const descriptionHtml = () => {
    return { __html: product.description };
  };

  return (
    <Flex
      onClick={onClick}
      shadow="md"
      borderRadius={10}
      overflow="hidden"
      w={{ base: "100%", lg: "70%" }}
      h="300"
      alignItems="center"
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.01)",
      }}
    >
      <Box
        flexShrink={0}
        w={{ base: "40%", lg: "30%" }}
        h="full"
        position="relative"
      >
        {product.image && (
          <NextImage src={product.image?.url} layout="fill" objectFit="cover" />
        )}
      </Box>
      <Box experimental_spaceY={4} p={10}>
        <Heading noOfLines={3} fontWeight={500} fontSize="4xl">
          {product.name}
        </Heading>
        <Box
          fontSize="sm"
          color="gray.500"
          noOfLines={2}
          dangerouslySetInnerHTML={descriptionHtml()}
        ></Box>
        <Text fontSize="3xl" fontFamily="Quicksand">
          {product.price.formatted_with_symbol}
        </Text>
      </Box>
    </Flex>
  );
};

export default ListProductCard;
