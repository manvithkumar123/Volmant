import { useState, useContext, createContext } from "react";

const CurrencyContext = createContext();

export const CurrencyExchange = ({ children }) => {
  const [currency, setCurrency] = useState("Rupee");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);