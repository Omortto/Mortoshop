import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  VStack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { useDataContext } from "../../context";
import { Category } from "../../types";

interface props {
  heading: string;
}

const SidebarOptions: FC<props> = ({ heading }) => {
  const { selectedCategories, setSelectedCategories, categories } =
    useDataContext();

  const checkBoxHandler = (value: string[] | number[]) => {
    setSelectedCategories(value);
  };

  return (
    <AccordionItem bg="gray.600" color="white">
      <AccordionButton py={3}>
        <Box flex="1" textAlign="left" fontWeight="500" letterSpacing={1}>
          {heading}
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <CheckboxGroup
          onChange={checkBoxHandler}
          colorScheme="whiteAlpha"
          value={selectedCategories}
        >
          <VStack alignItems="start">
            {categories.map((checkbox) => (
              <>
                <Checkbox value={checkbox.id} key={checkbox.id}>
                  {checkbox.name}
                </Checkbox>
                {checkbox.children.length > 0 &&
                  checkbox.children.map((childCat) => (
                    <Checkbox value={childCat.id} key={childCat.id} pl={6}>
                      {childCat.name}
                    </Checkbox>
                  ))}
              </>
            ))}
          </VStack>
        </CheckboxGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SidebarOptions;
