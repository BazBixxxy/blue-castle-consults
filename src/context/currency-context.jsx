import { currencies } from "@/lib/lib";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "UGX";
  });
  const [rates, setRates] = useState(currencies);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // useEffect(() => {
  //   const fetchRates = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(`/currency-rates/latest`);
  //       setRates(response.data.conversion_rates);
  //     } catch (error) {
  //       console.error("Error fetching exchange rates:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRates();
  // }, [currency]);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        setRates,
        loading,
        setLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
