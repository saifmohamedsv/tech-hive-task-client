import { useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

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
    <AuthContext.Provider value={appContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
