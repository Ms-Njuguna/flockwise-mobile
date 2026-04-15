import { createContext, useState } from "react";

export const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [flock, setFlock] = useState({
    chicks: 0,
    growers: 0,
    layers: 0,
  });

  const [records, setRecords] = useState([]);

  return (
    <FarmContext.Provider
      value={{
        flock,
        setFlock,
        records,
        setRecords,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};