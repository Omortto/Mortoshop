import { HStack, IconButton, Icon, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import useCart from "../../hooks/useCart";

interface props {
  cartQuantity: number;
  itemId: string;
}

const Quantity: FC<props> = ({ cartQuantity = 1, itemId }) => {
  const [quantity, setQuantity] = useState(cartQuantity);
  const { updateCart } = useCart();

  useEffect(() => {
    updateCart(itemId, quantity);
  }, [quantity]);

  const quantityHandlerPlus = () => {
    if (quantity! >= 10) return;
    setQuantity(quantity + 1);
  };
  const quantityHandlerMinus = () => {
    if (quantity! <= 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <HStack>
      <IconButton
        isDisabled={quantity <= 1}
        aria-label="decrease-quantity"
        onClick={quantityHandlerMinus}
        icon={<Icon as={AiOutlineMinus} />}
      />
      <Text>{quantity}</Text>
      <IconButton
        isDisabled={quantity >= 10}
        aria-label="increase-quantity"
        onClick={quantityHandlerPlus}
        icon={<Icon as={AiOutlinePlus} />}
      />
    </HStack>
  );
};

export default Quantity;
