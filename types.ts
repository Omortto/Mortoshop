import { CategoryCollection } from "@chec/commerce.js/features/categories";
import { ProductCollection } from "@chec/commerce.js/features/products";
import {
  LocaleListCountriesResponse,
  LocaleListSubdivisionsResponse,
} from "@chec/commerce.js/features/services";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { Product } from "@chec/commerce.js/types/product";

export type parent = "category" | "size" | "color";

export type selectedPropActionType = {
  parent: parent;
  value: string[] | number[];
};

export type selectedStateType = string[] | number[];

export interface ChildCategory {
  id: string;
  slug: string;
  name: string;
  assets: any[];
}

export interface Category {
  id: string;
  parent_id?: any;
  slug: string;
  name: string;
  description?: any;
  products: number;
  created: number;
  updated: number;
  meta?: any;
  assets: any[];
  children: ChildCategory[];
}

export interface ShopInfoState {
  products: Product[];
  categories: Category[];
  productCount: number;
  orderBy: string;
  page: number;
}

type productAction = {
  type: "fetch-products";
  products: ProductCollection;
};

type firstFetch = {
  type: "first-fetch";
  props: {
    products: ProductCollection;
    categories: CategoryCollection;
  };
};

export type ShopInfoAction = productAction | firstFetch;

export type selectedVariant = {
  size: { sizeVariantId: string; sizeOptionId: string };
  color: { colorVariantId: string; colorOptionId: string };
};

export interface checkoutFormValue {
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  town_city: string;
  country_state: string;
  postal_zip_code: string;
  country: string;
  shipping_option: string;
}

export interface checkoutState {
  checkoutToken?: CheckoutToken;
  shippingCountries?: LocaleListCountriesResponse;
  shippingSubDivisions?: LocaleListSubdivisionsResponse;
  selectedCountry: string;
  seletecSubDivision: string;
}

type cAction1 = { type: "checkout-token"; payload: CheckoutToken };
type cAction2 = { type: "countries"; payload: LocaleListCountriesResponse };
type cAction3 = {
  type: "subdivisions";
  payload: LocaleListSubdivisionsResponse;
};
type cAction4 = {
  type: "select-country";
  payload: string;
};

type cAction5 = {
  type: "select-subdivision";
  payload: string;
};

export type checkoutAction =
  | cAction1
  | cAction2
  | cAction3
  | cAction4
  | cAction5;
