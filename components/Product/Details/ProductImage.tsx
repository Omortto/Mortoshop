import React, { FC } from "react";
import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";

interface props {
  product: Product;
}

const ProductImage: FC<props> = ({ product }) => {
  return (
    <Box
      mt={{ base: 5, lg: 0 }}
      height={{ base: "50vh", sm: "60vh", md: "75vh", lg: "90vh" }}
      w={{ base: "100%", lg: "50%" }}
      position="relative"
      order={{ base: 1, lg: 2 }}
    >
      {product.image && (
        <NextImage src={product.image?.url} layout="fill" objectFit="cover" />
      )}
    </Box>
  );
};

export default ProductImage;
