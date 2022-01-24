import { checkoutAction, checkoutState } from "../../types";

export const checkoutReducer = (
  state: checkoutState,
  action: checkoutAction
): checkoutState => {
  switch (action.type) {
    case "checkout-token":
      return { ...state, checkoutToken: action.payload };
    case "countries":
      return { ...state, shippingCountries: action.payload };
    case "subdivisions":
      return { ...state, shippingSubDivisions: action.payload };
    case "select-country":
      return { ...state, selectedCountry: action.payload };
    case "select-subdivision":
      return { ...state, seletecSubDivision: action.payload };
    default:
      return state;
  }
};

export const checkoutInitState: checkoutState = {
  checkoutToken: undefined,
  shippingCountries: undefined,
  shippingSubDivisions: undefined,
  selectedCountry: "",
  seletecSubDivision: "",
};
