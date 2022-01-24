import { Flex, Heading, Button } from "@chakra-ui/react";
import {
  CheckDiscountResponse,
  GetShippingOptionsResponse,
} from "@chec/commerce.js/features/checkout";
import {
  LocaleListCountriesResponse,
  LocaleListSubdivisionsResponse,
} from "@chec/commerce.js/features/services";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";

import { yupResolver } from "@hookform/resolvers/yup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import commerce from "../../lib/commerce";
import { checkoutFormValue } from "../../types";
import { checkoutSchema } from "../yupValidation";
import CInput from "./CInput";
import CSelect from "./CSelect";
import ReviewItem from "./ReviewItem";
import TotalValue from "./TotalValue";

interface props {
  shippingCountries: LocaleListCountriesResponse;
  checkoutToken: CheckoutToken | undefined;
}

const CheckoutForm: FC<props> = ({ shippingCountries, checkoutToken }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<checkoutFormValue>({ resolver: yupResolver(checkoutSchema) });

  const stripe = useStripe();
  const elements = useElements();

  const country = useWatch<checkoutFormValue>({
    control,
    defaultValue: "",
    name: "country",
  });

  const subdiv = useWatch<checkoutFormValue>({
    control,
    defaultValue: "",
    name: "country_state",
  });

  const [shippingMethods, setShippingMethods] = useState<
    GetShippingOptionsResponse[]
  >([]);

  const [shippingSubdivisions, setShippingSubdivisions] =
    useState<LocaleListSubdivisionsResponse>();

  const [discountResponse, setDiscountResponse] =
    useState<CheckDiscountResponse>();

  useEffect(() => {
    if (!checkoutToken || !country) return;
    (async () => {
      const sub = await commerce.services.localeListShippingSubdivisions(
        checkoutToken.id,
        country
      );
      setShippingSubdivisions(sub);
    })();
  }, [country]);

  useEffect(() => {
    if (!checkoutToken) return;
    (async () => {
      const shippingMethods = await commerce.checkout.getShippingOptions(
        checkoutToken.id,
        {
          country: country,
          region: subdiv,
        }
      );

      setShippingMethods(shippingMethods);
    })();
  }, [subdiv]);

  const onSubmit: SubmitHandler<checkoutFormValue> = async (data) => {
    if (!checkoutToken || !stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const stripeResponse = await stripe?.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (stripeResponse.error) {
      return console.log(stripeResponse.error);
    }

    const order = await commerce.checkout.capture(checkoutToken.id, {
      line_items: checkoutToken.line_items,
      customer: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      },
      discount_code: discountResponse?.code,
      shipping: {
        country: data.country,
        county_state: data.country_state,
        postal_zip_code: data.postal_zip_code,
        street: data.street,
        town_city: data.town_city,
        name: "Primary",
      },
      fulfillment: {
        shipping_method: data.shipping_option,
      },
      payment: {
        gateway: "stripe",
        stripe: {
          payment_method_id: stripeResponse.paymentMethod.id,
        },
      },
    });

    console.log(order);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" gap={2}>
        <Flex gap={2}>
          <CInput
            errors={errors}
            type="text"
            register={register}
            name="firstname"
            placeholder="First Name"
            required
          />
          <CInput
            errors={errors}
            type="text"
            register={register}
            name="lastname"
            placeholder="Last name"
            required
          />
        </Flex>

        <CInput
          errors={errors}
          type="email"
          register={register}
          name="email"
          placeholder="Email Address"
          required
        />
        <CInput
          errors={errors}
          type="text"
          register={register}
          name="street"
          placeholder="Address"
          required
        />
        <Flex gap={2}>
          <CInput
            errors={errors}
            type="text"
            register={register}
            name="town_city"
            placeholder="City"
            required
          />
          <CInput
            errors={errors}
            type="text"
            register={register}
            name="postal_zip_code"
            placeholder="Zip Code"
            required
          />
        </Flex>

        <CSelect
          {...register("country")}
          placeholder="Shipping country"
          errors={errors}
        >
          {shippingCountries &&
            Object.entries(shippingCountries.countries).map(
              ([code, country]) => (
                <option key={code} value={code}>
                  {country}
                </option>
              )
            )}
        </CSelect>

        <CSelect
          errors={errors}
          {...register("country_state")}
          placeholder="Subdivision"
          isDisabled={!country}
        >
          {shippingSubdivisions &&
            Object.entries(shippingSubdivisions.subdivisions).map(
              ([id, subdivision]) => (
                <option value={id} key={id}>
                  {subdivision}
                </option>
              )
            )}
        </CSelect>

        <CSelect
          errors={errors}
          {...register("shipping_option")}
          placeholder="Shipping Option"
          isDisabled={!subdiv || !country}
        >
          {shippingMethods.map((method) => (
            <option value={method.id} key={method.id}>
              {method.description + " " + method.price.formatted_with_symbol}
            </option>
          ))}
        </CSelect>

        <Heading as="h2" size="lg" mt={10} color="gray.700">
          Review Items
        </Heading>

        <Flex mt={5} mb={10} flexDir="column" gap={2}>
          {checkoutToken?.live.line_items.map((item) => (
            <ReviewItem key={item.id} item={item} />
          ))}
          <TotalValue
            discountResponse={discountResponse}
            setDiscountResponse={setDiscountResponse}
            checkoutToken={checkoutToken}
          />
        </Flex>

        <Heading as="h2" size="lg" mt={10} mb={8} color="gray.700">
          Add Payment Info
        </Heading>

        <CardElement />

        <Button w="full" mt={5} type="submit" colorScheme="blackAlpha">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CheckoutForm;
