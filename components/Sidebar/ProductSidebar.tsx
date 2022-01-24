import { Accordion, color, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { useDataContext } from "../../context";

const SidebarOptions = dynamic(() => import("./SidebarOptions"));

const ProductSidebar = () => {
  const { categories } = useDataContext();

  return (
    <Flex
      display={{ base: "none", xl: "flex" }}
      mr={10}
      flexShrink={0}
      w={300}
      flexDir="column"
      borderRadius="xl"
    >
      <Accordion defaultIndex={[0]} allowMultiple experimental_spaceY={4}>
        <SidebarOptions heading="Categories" />
      </Accordion>
    </Flex>
  );
};

export default ProductSidebar;
