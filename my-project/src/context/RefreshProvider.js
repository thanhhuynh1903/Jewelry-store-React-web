import React, { createContext, useState, useCallback } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(false);

  const triggerRefresh = useCallback(() => {
    setRefreshKey(prev => !prev);  // Toggle the boolean value
  }, []);

  return (
    <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => React.useContext(RefreshContext);
