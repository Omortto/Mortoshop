import { Flex, Icon, Input, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { ErrorOption, FieldError, UseFormRegister } from "react-hook-form";
import { checkoutFormValue } from "../../types";
import { BiErrorCircle } from "react-icons/bi";
import ErrorMsg from "../ErrorMsg";

interface props {
  placeholder: string;
  register: UseFormRegister<checkoutFormValue>;
  type: React.HTMLInputTypeAttribute;
  required: boolean;
  name: keyof checkoutFormValue;
  errors: any;
}

const CInput: FC<props> = ({
  placeholder,
  register,
  type,
  required,
  name,
  errors,
}) => {
  return (
    <Flex w="full" flexDir="column">
      <Input
        isInvalid={errors[name]}
        errorBorderColor="red.500"
        type={type}
        {...register(name, { required })}
        name={name}
        placeholder={placeholder}
      />

      <ErrorMsg name={name} errors={errors} />
    </Flex>
  );
};

export default CInput;
