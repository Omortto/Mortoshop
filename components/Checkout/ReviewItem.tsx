import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LineItem } from "@chec/commerce.js/types/line-item";
import React, { FC } from "react";
import NextImage from "next/image";

interface props {
  item: LineItem;
}

const ReviewItem: FC<props> = ({ item }) => {
  return (
    <Flex
      borderRadius={10}
      w="full"
      h={70}
      gap={2}
      alignItems="center"
      shadow="sm"
    >
      <Box
        flexShrink={0}
        position="relative"
        w="20%"
        h="full"
        overflow="hidden"
        borderRadius={10}
      >
        {item.image && (
          <NextImage src={item.image?.url} layout="fill" objectFit="cover" />
        )}
      </Box>
      <Flex flex={1} flexDir="column">
        <Heading noOfLines={2} as="h3" fontSize="md" fontWeight={500}>
          {item.product_name}
        </Heading>

        <Text> Quantity: {item.quantity}</Text>
      </Flex>
      <Text fontSize="xl" fontWeight={500} fontFamily="Quicksand">
        {item.line_total.formatted_with_symbol}
      </Text>
    </Flex>
  );
};

export default ReviewItem;
