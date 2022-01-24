import React, { createContext, FC, useContext } from "react";
import DataContextValue from "./DataContext";
import UiContextValue from "./UiContext";

const UiContext = createContext({} as ReturnType<typeof UiContextValue>);
const DataContext = createContext({} as ReturnType<typeof DataContextValue>);

const Context: FC = ({ children }) => {
  const uiValue = UiContextValue();
  const DataValue = DataContextValue();

  return (
    <UiContext.Provider value={uiValue}>
      <DataContext.Provider value={DataValue}>{children}</DataContext.Provider>
    </UiContext.Provider>
  );
};

export const useUiContext = () => {
  const uiContext = useContext(UiContext);

  return uiContext;
};

export const useDataContext = () => {
  const dataContext = useContext(DataContext);

  return dataContext;
};

export default Context;
