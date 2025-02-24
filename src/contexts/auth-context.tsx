"use client"

import * as React from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // Implement actual authentication logic here
    setUser({
      id: "1",
      name: "John Doe",
      email: email,
      role: "customer",
    })
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (email: string, password: string, name: string) => {
    // Implement actual registration logic here
    setUser({
      id: "1",
      name: name,
      email: email,
      role: "customer",
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

