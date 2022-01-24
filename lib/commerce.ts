import CommerceSdk from "@chec/commerce.js";

const commerce = new CommerceSdk(
  process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY as string
);

export default commerce;
