import * as yup from "yup";

export const checkoutSchema = yup.object({
  firstname: yup
    .string()

    .max(30)
    .required("First name is required"),
  lastname: yup.string().max(30).required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  street: yup.string().required("Address is required"),
  town_city: yup.string().required("City is required"),
  postal_zip_code: yup.string().required("Zip code is required"),
  country: yup.string().required("Select country"),
  country_state: yup.string().required("Select subdivision"),
});
