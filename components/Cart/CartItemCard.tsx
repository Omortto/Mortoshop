import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { FC, useState } from "react";
import NextImage from "next/image";
import Quantity from "./Quantity";
import { BsTrash } from "react-icons/bs";
import useCart from "../../hooks/useCart";

interface props {
  cartItem: LineItem;
}

const CartItemCard: FC<props> = ({ cartItem }) => {
  const { removeFromCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    setIsLoading(true);

    const item = await removeFromCart(cartItem.id);

    setIsLoading(item.isLoading);
  };

  return (
    <Flex
      shadow="md"
      borderRadius={10}
      align="center"
      gap={4}
      cursor={{ base: "auto", md: "pointer" }}
      outline={0}
      h={150}
      w="full"
      overflow="hidden"
    >
      <Box
        overflow="hidden"
        h="full"
        w={{ base: "30%", md: "20%", lg: "30%" }}
        flexShrink={0}
        pos="relative"
      >
        {cartItem.image && (
          <NextImage src={cartItem.image.url} layout="fill" objectFit="cover" />
        )}
      </Box>
      <VStack alignItems="start">
        <Heading noOfLines={1} as="h2" fontWeight={500} fontSize="2xl">
          {cartItem.name}
        </Heading>
        <HStack flexWrap="wrap" gap={4}>
          <Text color="gray.700" fontFamily="Quicksand" fontSize="xl">
            {cartItem.price.formatted_with_symbol}
          </Text>

          <Quantity itemId={cartItem.id} cartQuantity={cartItem.quantity} />
          <IconButton
            isLoading={isLoading}
            onClick={onRemove}
            colorScheme="red"
            aria-label="remove-item"
            icon={<Icon as={BsTrash} />}
          />
        </HStack>
      </VStack>
    </Flex>
  );
};

export default CartItemCard;
