import { Flex } from "@chakra-ui/react";
import type { InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import ProductList from "../components/Product/ProductList";
import SearchBar from "../components/Search/SearchBar";

import ViewType from "../components/ViewType";
import { useDataContext } from "../context";
import commerce from "../lib/commerce";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatchInfo } = useDataContext();

  useEffect(() => {
    dispatchInfo({ type: "first-fetch", props });
  }, []);

  return (
    <>
      <SearchBar />
      <ViewType />
      <Flex
        mt={4}
        flexShrink={0}
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        {/* <ProductSidebar /> */}
        <ProductList />
      </Flex>
    </>
  );
};

export const getStaticProps = async () => {
  const categories = await commerce.categories.list();
  const products = await commerce.products.list({ limit: 20, page: 1 });

  return {
    props: {
      categories,
      products,
    },
  };
};

export default Home;
