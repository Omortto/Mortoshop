import { useState } from "react";

const UiContextValue = () => {
  const [searchCategory, setSearchCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);

  return {
    searchCategory,
    setSearchCategory,
    isGridView,
    setIsGridView,
  };
};

export default UiContextValue;
