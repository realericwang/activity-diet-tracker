import React, { createContext, useState, useContext } from "react";

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [dietItems, setDietItems] = useState([]);

  const addDietItem = (newDietItem) => {
    setDietItems((prevDietItems) => [...prevDietItems, newDietItem]);
    console.log(newDietItem);
  };

  return (
    <DietContext.Provider value={{ dietItems, addDietItem }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);
