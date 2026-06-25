import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AuthUser } from '../services/api'

interface User { _id: string; name: string; email: string; role: string }

interface AuthContextType {
  user: User | null
  token: string | null
  login: (userData: AuthUser) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Wczytaj zapisane dane logowania przy starcie
    AsyncStorage.multiGet(['user', 'token']).then(pairs => {
      const savedUser = pairs[0][1]
      const savedToken = pairs[1][1]
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser))
        setToken(savedToken)
      }
    })
  }, [])

  const login = async (userData: AuthUser) => {
    const { token: jwt, ...userInfo } = userData
    setUser(userInfo)
    setToken(jwt)
    await AsyncStorage.multiSet([
      ['user', JSON.stringify(userInfo)],
      ['token', jwt],
    ])
  }

  const logout = async () => {
    setUser(null)
    setToken(null)
    await AsyncStorage.multiRemove(['user', 'token'])
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
