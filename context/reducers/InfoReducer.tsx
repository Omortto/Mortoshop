import { ShopInfoState, ShopInfoAction, Category } from "../../types";

export const infoReducer = (
  state: ShopInfoState,
  action: ShopInfoAction
): ShopInfoState => {
  switch (action.type) {
    case "fetch-products":
      return {
        ...state,
        products: [...state.products, ...action.products.data],
        page: action.products.meta.pagination.current_page,
      };

    case "first-fetch":
      return {
        ...state,
        products: action.props.products.data,
        categories: action.props.categories.data as Category[],
        productCount: action.props.products.meta.pagination.total,
      };

    default:
      return state;
  }
};

export const initInfo: ShopInfoState = {
  products: [],
  productCount: 0,
  categories: [],
  orderBy: "",
  page: 1,
};
