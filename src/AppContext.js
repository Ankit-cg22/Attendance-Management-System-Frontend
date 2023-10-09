import React, { createContext, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const DEFAULT_DATA = {firstName:"Ankit" , lastName : "Das"};
  const [contextData, setContextData] = useState(() => {
    // Check if data exists in local storage and use it, or use a default value
    const storedData = localStorage.getItem('myData');
    return storedData ? JSON.parse(storedData) : DEFAULT_DATA;
  });

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('myData', JSON.stringify(contextData));
  }, [contextData]);
  const providerValue = useMemo(() => ({contextData: contextData , setContextData: setContextData}) , [contextData , setContextData])
  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};
