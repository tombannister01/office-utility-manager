import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/General";

interface AuthContextValue { user: User | null; isLoading: boolean; }

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/login").then(r => r.json()).then(u => setUser(u)).finally(() => setLoading(false));
  }, []);
  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be used within an AuthProvider");
  return c;
};
