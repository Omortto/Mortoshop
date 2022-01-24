import { Flex, Icon, Select, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { checkoutFormValue } from "../../types";
import ErrorMsg from "../ErrorMsg";

const CSelect = React.forwardRef<
  HTMLSelectElement,
  {
    placeholder?: string;
    children: ReactNode;
    isDisabled?: boolean;
    errors: any;
  } & ReturnType<UseFormRegister<checkoutFormValue>>
>(
  (
    {
      onChange,
      onBlur,
      name,
      children,
      placeholder,
      isDisabled = false,
      errors,
    },
    ref
  ) => (
    <Flex flexDir="column">
      <Select
        isDisabled={isDisabled}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isInvalid={errors[name]}
      >
        {children}
      </Select>
      <ErrorMsg name={name} errors={errors} />
    </Flex>
  )
);

export default CSelect;
