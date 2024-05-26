import React, { createContext, useState } from "react";

export const AppContext = createContext();

export function ContextProvider({ children }) {
  const [minValue, setMinValue] = useState(2000);
  const [maxValue, setMaxValue] = useState(5000);

  const value = { minValue, maxValue, setMinValue, setMaxValue };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
