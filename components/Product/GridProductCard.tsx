import { Box, Text, Heading } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import React from "react";
import NextImage from "next/image";

interface props {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<props> = ({ product, onClick }) => {
  return (
    <Box
      onClick={onClick}
      role="group"
      cursor="pointer"
      textAlign="center"
      height="min"
      overflow="hidden"
    >
      <Box borderRadius={4} overflow="hidden" height={400} width="full">
        <Box
          h="full"
          w="full"
          transition="all 0.3s ease"
          _groupHover={{ transform: "scale(1.1)" }}
          position="relative"
        >
          {product.image && (
            <NextImage
              src={product.image?.url}
              layout="fill"
              objectFit="cover"
            />
          )}
        </Box>
      </Box>
      <Heading
        transition="all 0.3s ease"
        _groupHover={{
          color: "gray.700",
          letterSpacing: 1,
        }}
        mt={5}
        fontWeight={500}
        as="h2"
        color="gray.500"
        fontSize="lg"
      >
        {product.name}
      </Heading>
      <Text
        mt={2}
        fontWeight="600"
        color="gray.700"
        fontFamily="Quicksand"
        fontSize="2xl"
      >
        {product.price.formatted_with_symbol}
      </Text>
    </Box>
  );
};

export default ProductCard;
