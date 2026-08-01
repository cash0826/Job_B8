import { useState, useEffect, createContext, useContext } from "react";
import { getJWTUserId, userLogin } from "../services/UserService"

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check user on mount
  useEffect(() => {
    getJWTUserId()
      .then( (u) => setUser(u))
      .catch( () => setUser(null))
      .finally( () => setLoading(false))
  }, []);

  async function login(credentials) {
    const data = await userLogin(credentials)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )

}