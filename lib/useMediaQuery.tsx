import { useMediaQuery } from "@chakra-ui/react";

const useScreen = () => {
  const [isLargerThanTab, isLargerThanPhone] = useMediaQuery([
    "(min-width: 910px)",
    "(max-width: 560px)",
  ]);

  return { isLargerThanTab, isLargerThanPhone };
};

export default useScreen;
