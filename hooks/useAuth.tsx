import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export const useAuth = (): {
  userId: string;
  setUserId: (userId: string) => void;
} => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const appContextValue = useMemo(
    () => ({
      userId,
      setUserId,
    }),
    [userId]
  );

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};
