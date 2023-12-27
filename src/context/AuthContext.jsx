import { createContext, useContext, useEffect, useState } from "react";
import { onUserStateChanged, login, logout } from "../api/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChanged(user => setUser(user))
  }, [])

  return <AuthContext.Provider value={{user, login, logout}}>
    { children }
  </AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}