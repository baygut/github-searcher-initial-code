import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  displayText: string;
  setDisplayText: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayText, setDisplayText] = useState('Initial Text');

  const contextValue: AppContextType = {
    displayText,
    setDisplayText,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
