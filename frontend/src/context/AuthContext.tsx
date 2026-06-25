import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { AuthUser } from '../services/api'

interface User {
  _id?: string
  name: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (userData: AuthUser) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Wczytaj dane z localStorage przy starcie
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user')
      const savedToken = localStorage.getItem('token')
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
        setToken(savedToken)
      }
    } catch {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [])

  const login = (userData: AuthUser) => {
    const { token: jwt, ...userInfo } = userData
    setUser(userInfo)
    setToken(jwt)
    localStorage.setItem('user', JSON.stringify(userInfo))
    localStorage.setItem('token', jwt)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
