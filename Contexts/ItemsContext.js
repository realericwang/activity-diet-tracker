import React, { createContext, useState, useContext } from 'react';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    { id: 1, name: 'Running', duration: '30 minutes', date: '2023-05-01' },
    { id: 2, name: 'Cycling', duration: '45 minutes', date: '2023-05-02' },
    { id: 3, name: 'Swimming', duration: '1 hour', date: '2023-05-03' },
  ]);

  const [dietItems, setDietItems] = useState([
    { id: 1, name: 'Salad', calories: 150, date: '2023-05-01' },
    { id: 2, name: 'Grilled Chicken', calories: 250, date: '2023-05-02' },
    { id: 3, name: 'Fruit Smoothie', calories: 200, date: '2023-05-03' },
  ]);

  return (
    <ItemsContext.Provider value={{ activities, dietItems, setActivities, setDietItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);
