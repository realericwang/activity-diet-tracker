import React, { createContext, useState, useContext } from "react";

const DietContext = createContext();

export const DietProvider = ({ children }) => {
  const [dietItems, setDietItems] = useState([
    { id: 1, name: "Salad", calories: 150, date: "2023-05-01" },
    { id: 2, name: "Grilled Chicken", calories: 250, date: "2023-05-02" },
    { id: 3, name: "Fruit Smoothie", calories: 200, date: "2023-05-03" },
  ]);

  return (
    <DietContext.Provider value={{ dietItems, setDietItems }}>
      {children}
    </DietContext.Provider>
  );
};

export const useDiet = () => useContext(DietContext);

