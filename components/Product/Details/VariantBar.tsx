import { Flex, Text, Box, Heading, Button } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import { ProductVariantGroup } from "@chec/commerce.js/types/product-variant-group";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useCart from "../../../hooks/useCart";
import { selectedVariant } from "../../../types";

interface props {
  product: Product;
  setSelectedVariant: Dispatch<SetStateAction<selectedVariant>>;
  selectedVariant: selectedVariant;
}

const VariantBar: FC<props> = ({
  product,
  setSelectedVariant,
  selectedVariant,
}) => {
  const [sizes, setSizes] = useState<ProductVariantGroup | null>(null);
  const [colors, setColors] = useState<ProductVariantGroup | null>(null);

  const { addToCart } = useCart();

  const setVariants = useCallback(() => {
    product.variant_groups.map((variant) => {
      if (variant.name.toLowerCase() === "size") {
        setSizes(variant);
      } else if (variant.name.toLowerCase() === "color") {
        setColors(variant);
      }
    });
  }, []);

  useEffect(() => {
    setVariants();
  }, [setVariants]);

  return (
    <Flex
      borderLeft={{ base: "none", lg: "1px" }}
      borderColor="gray.100"
      w={{ base: "100%", lg: "25%" }}
      flexDir="column"
      order={3}
      p={{ base: 0, lg: 10 }}
      position="relative"
    >
      <Heading my={2} fontWeight={600} fontSize="lg" as="h2">
        Choose Size
      </Heading>
      <Flex mb={8} mt={3} gap={2} flexWrap="wrap">
        {sizes?.options.map((size) => (
          <Box
            key={size.id}
            cursor="pointer"
            fontWeight={600}
            px={3}
            py={2}
            borderRadius={16}
            onClick={() =>
              setSelectedVariant({
                ...selectedVariant,
                size: { sizeVariantId: sizes.id, sizeOptionId: size.id },
              })
            }
            bg={
              selectedVariant.size.sizeOptionId === size.id
                ? "gray.800"
                : "gray.100"
            }
            color={
              selectedVariant.size.sizeOptionId === size.id
                ? "gray.50"
                : "gray.900"
            }
          >
            {size.name}
          </Box>
        ))}
      </Flex>
      {colors && (
        <Heading my={2} fontWeight={600} fontSize="lg" as="h2">
          Choose Color
        </Heading>
      )}

      <Flex mb={{ base: 5, lg: 0 }} mt={4} gap={2}>
        {colors?.options.map((color) => (
          <Box
            key={color.id}
            border="1px"
            borderColor="gray.300"
            cursor="pointer"
            h={9}
            w={9}
            borderRadius="full"
            backgroundColor={color.name}
            display="flex"
            justifyContent="center"
            onClick={() =>
              setSelectedVariant({
                ...selectedVariant,
                color: { colorVariantId: colors.id, colorOptionId: color.id },
              })
            }
            alignItems="center"
          >
            {selectedVariant.color.colorOptionId === color.id && (
              <Box
                h={2}
                borderRadius="full"
                w={2}
                bg={color.name.toLowerCase() === "white" ? "black" : "white"}
              ></Box>
            )}
          </Box>
        ))}
      </Flex>
      <Button
        bg="gray.800"
        transition="all 0.3s ease"
        _hover={{ backgroundColor: "gray.900", letterSpacing: 1 }}
        _active={{ transform: "scale(0.95)" }}
        color="white"
        position={{ base: "static", lg: "absolute" }}
        py={6}
        bottom={10}
        w="full"
        onClick={() => addToCart(selectedVariant, product.id, 1)}
        isDisabled={
          !selectedVariant.color.colorOptionId ||
          !selectedVariant.size.sizeOptionId
        }
        mb={{ base: 5, lg: 0 }}
      >
        Add to Cart
      </Button>
    </Flex>
  );
};

export default VariantBar;
