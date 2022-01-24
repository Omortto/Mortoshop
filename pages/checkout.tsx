import { Box, Center, Container, Heading, Spinner } from "@chakra-ui/react";
import { LocaleListCountriesResponse } from "@chec/commerce.js/features/services";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDataContext } from "../context";
import commerce from "../lib/commerce";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/Checkout/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_API_KEY as string
);

const checkout = () => {
  const { cart } = useDataContext();

  const [shippingCountries, setShippingCountries] =
    useState<LocaleListCountriesResponse>();
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
  useEffect(() => {
    if (!cart) return;

    (async () => {
      const checkoutToken = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });

      console.log(checkoutToken);
      setCheckoutToken(checkoutToken);

      const countries = await commerce.services.localeListShippingCountries(
        checkoutToken.id
      );
      setShippingCountries(countries);
    })();
  }, [cart]);

  return (
    <>
      <Head>
        <title>Checkout | Mortoshop</title>
      </Head>
      <Container mt={10} shadow="md" borderRadius={10} p={10}>
        <Heading as="h2" size="lg" color="gray.700">
          Add Shipping Info
        </Heading>
        <Box mt={6}>
          {!shippingCountries ? (
            <Center mt={10}>
              <Spinner size="lg" />
            </Center>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                checkoutToken={checkoutToken}
                shippingCountries={shippingCountries}
              />
            </Elements>
          )}
        </Box>
      </Container>
    </>
  );
};

export default checkout;
