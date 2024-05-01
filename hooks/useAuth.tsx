import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = (): {
  userId: string;
  setUserId: (userId: string) => void;
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
