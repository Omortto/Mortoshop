import { useDataContext } from "../context";
import commerce from "../lib/commerce";
import { selectedVariant } from "../types";

const useCart = () => {
  const { setCart } = useDataContext();

  const addToCart = async (
    selectedVariant: selectedVariant,
    productId: string,
    quantity: number
  ) => {
    if (!selectedVariant || !productId) return;
    const { color, size } = selectedVariant;

    const response = await commerce.cart.add(productId, quantity, {
      [size.sizeVariantId]: size.sizeOptionId,
      [color.colorVariantId]: color.colorOptionId,
    });

    setCart(response.cart);

    return { isLoading: false };
  };

  const removeFromCart = async (itemId: string) => {
    const response = await commerce.cart.remove(itemId);

    setCart(response.cart);

    return { isLoading: false };
  };

  const updateCart = async (itemId: string, quantity: number) => {
    const response = await commerce.cart.update(itemId, { quantity: quantity });

    setCart(response.cart);
  };

  return { addToCart, removeFromCart, updateCart };
};

export default useCart;
