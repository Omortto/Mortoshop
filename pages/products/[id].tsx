import { Flex } from "@chakra-ui/react";
import { Product } from "@chec/commerce.js/types/product";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import ProductImage from "../../components/Product/Details/ProductImage";
import TitleInfoBar from "../../components/Product/Details/TitleInfoBar";
import VariantBar from "../../components/Product/Details/VariantBar";
import commerce from "../../lib/commerce";

const Product = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!props.product) {
    return <div>No Product to show</div>;
  }

  const [selectedVariant, setSelectedVariant] = useState({
    size: { sizeVariantId: "", sizeOptionId: "" },
    color: { colorVariantId: "", colorOptionId: "" },
  });

  return (
    <>
      <Head>
        <title>
          {props.product.seo.title || props.product.name} | MortoShop
        </title>
        <meta name="description" content={props.product.seo.description} />
      </Head>
      <Flex w="100%" flexDir={{ base: "column", lg: "row" }}>
        <TitleInfoBar product={props.product} />
        <ProductImage product={props.product} />
        <VariantBar
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          product={props.product}
        />
      </Flex>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await commerce.products.list();

  const paths = data.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof params.id !== "string") {
    return {
      props: {
        products: null,
      },
    };
  }

  const product = await commerce.products.retrieve(params.id, {
    type: "permalink",
  });

  return {
    props: {
      product,
    },
  };
};

export default Product;
