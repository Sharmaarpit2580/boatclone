import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('authUser')
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      console.error('Failed to parse auth user from storage', err)
      return null
    }
  })

  const signIn = (payload) => {
    setUser(payload)
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('authUser')
  }

  const value = useMemo(() => ({ user, signIn, signOut }), [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user))
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

