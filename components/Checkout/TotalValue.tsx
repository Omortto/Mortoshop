import { Divider, Flex, Icon, IconButton, Input, Text } from "@chakra-ui/react";
import { CheckDiscountResponse } from "@chec/commerce.js/features/checkout";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { BsSearch } from "react-icons/bs";
import commerce from "../../lib/commerce";

interface props {
  checkoutToken?: CheckoutToken;
  setDiscountResponse: Dispatch<
    SetStateAction<CheckDiscountResponse | undefined>
  >;
  discountResponse: CheckDiscountResponse | undefined;
}

const TotalValue: FC<props> = ({
  checkoutToken,
  setDiscountResponse,
  discountResponse,
}) => {
  //   const { checkoutToken } = useDataContext();
  const [discount, setDiscount] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const checkDiscount = async () => {
    if (!checkoutToken) return;
    setIsLoading(true);
    const response = await commerce.checkout.checkDiscount(checkoutToken.id, {
      code: discount,
    });
    setDiscountResponse(response);
  };

  return (
    <Flex flexDir="column" gap={5} fontWeight={500} fontSize="md">
      <Divider my={4} w="full" />
      <Flex justifyContent="space-between">
        <Text>Subtotal:</Text>
        <Text fontFamily="Quicksand">
          {checkoutToken?.live.subtotal.formatted_with_symbol}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>Discount:</Text>
        {!discountResponse ? (
          <Flex alignItems="center" w="30%">
            <Input
              onChange={(e) => setDiscount(e.target.value)}
              w="100%"
              size="sm"
            />
            <IconButton
              isLoading={isLoading}
              onClick={checkDiscount}
              colorScheme="twitter"
              size="sm"
              aria-label=""
              icon={<Icon as={BsSearch} />}
            />
          </Flex>
        ) : (
          discountResponse.valid && (
            <Text fontFamily="Quicksand">
              - {discountResponse.amount_saved.formatted_with_symbol}
            </Text>
          )
        )}
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Total:</Text>
        <Text fontFamily="Quicksand">
          {discountResponse?.live.total_with_tax.formatted_with_symbol ||
            checkoutToken?.live.total_with_tax.formatted_with_symbol}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TotalValue;
