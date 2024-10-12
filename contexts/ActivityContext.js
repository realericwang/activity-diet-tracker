import React, { createContext, useState, useContext } from "react";

const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    { id: 1, name: "Running", duration: "30 minutes", date: "2023-05-01" },
    { id: 2, name: "Cycling", duration: "45 minutes", date: "2023-05-02" },
    { id: 3, name: "Swimming", duration: "1 hour", date: "2023-05-03" },
  ]);

  return (
    <ActivityContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => useContext(ActivityContext);

