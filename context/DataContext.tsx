import { Cart } from "@chec/commerce.js/types/cart";

import { useEffect, useReducer, useState } from "react";
import commerce from "../lib/commerce";

import { selectedStateType } from "../types";
import { checkoutInitState, checkoutReducer } from "./reducers/CheckoutReducer";
import { infoReducer, initInfo } from "./reducers/InfoReducer";

const DataContext = () => {
  const [selectedCategories, setSelectedCategories] =
    useState<selectedStateType>([]);

  const [shopInfo, dispatchInfo] = useReducer(infoReducer, initInfo);

  const [
    { checkoutToken, shippingCountries, shippingSubDivisions, selectedCountry },
    cDispatch,
  ] = useReducer(checkoutReducer, checkoutInitState);

  const [cart, setCart] = useState<Cart | null>(null);

  const fetchProducts = async () => {
    if (shopInfo.products.length >= shopInfo.productCount) return;

    const fetchedProducts = await commerce.products.list({
      limit: 20,
      page: shopInfo.page + 1,
    });

    dispatchInfo({ type: "fetch-products", products: fetchedProducts });
  };

  const fetchCountries = async () => {
    if (!checkoutToken) return;
    const countries = await commerce.services.localeListShippingCountries(
      checkoutToken.id
    );

    console.log(countries);
    cDispatch({ type: "countries", payload: countries });
  };

  const fetchSubDivisions = async () => {
    if (!checkoutToken || !selectedCountry) return;

    const subdivisions = await commerce.services.localeListShippingSubdivisions(
      checkoutToken.id,
      selectedCountry
    );

    console.log(subdivisions);
    cDispatch({ type: "subdivisions", payload: subdivisions });
  };

  useEffect(() => {
    (async () => {
      setCart(await commerce.cart.retrieve());
    })();
  }, []);

  return {
    ...shopInfo,
    selectedCategories,
    setSelectedCategories,
    fetchProducts,
    dispatchInfo,
    cart,
    setCart,
    checkoutToken,
    fetchCountries,
    fetchSubDivisions,
    checkoutDispatch: cDispatch,
    shippingCountries,
    shippingSubDivisions,
  };
};

export default DataContext;
