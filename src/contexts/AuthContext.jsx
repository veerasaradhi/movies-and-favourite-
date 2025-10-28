import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Mock credentials for demo - in real app, this would be API-based
const DEMO_USER = {
  email: 'demo@example.com',
  // In real app, this would be hashed and stored securely
  password: 'demo123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse stored user:', e)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 500))

    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const userData = { email, name: 'Demo User' }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return true
    }
    throw new Error('Invalid credentials')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}