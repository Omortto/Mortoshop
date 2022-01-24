import { Flex, Grid, List, SimpleGrid } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useDataContext, useUiContext } from "../../context";
import GridProductCard from "./GridProductCard";
import ListProductCard from "./ListProductCard";

const ProductList = () => {
  const { products, fetchProducts } = useDataContext();
  const { isGridView } = useUiContext();

  const [element, view] = useInView({ threshold: 0.7 });
  const router = useRouter();

  const routeToProductDetails = (permalink: string) => {
    router.push(`products/${permalink}`);
  };

  useEffect(() => {
    if (view) {
      fetchProducts();
    }
  }, [view]);

  if (isGridView) {
    return (
      <SimpleGrid
        w="100%"
        minChildWidth={{ base: 300, lg: 400 }}
        ref={element}
        spacing={5}
      >
        {products.map((product) => (
          <GridProductCard
            onClick={() => routeToProductDetails(product.permalink)}
            key={product.id}
            product={product}
          />
        ))}
      </SimpleGrid>
    );
  } else {
    return (
      <Flex alignItems="center" gap={4} w="100%" flexDir="column">
        {products.map((product) => (
          <ListProductCard
            onClick={() => routeToProductDetails(product.permalink)}
            key={product.id}
            product={product}
          />
        ))}
      </Flex>
    );
  }
};

export default ProductList;
