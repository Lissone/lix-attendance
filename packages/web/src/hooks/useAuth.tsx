import { createContext, useContext, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'

import { api } from '../services/api'

interface User {
  id?: string
  type: string
  name: string
  email: string
  socket: string
  createdAt?: Date
}

interface AuthContextType {
  user: User | null
  signIn: (user: User) => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User>(null)

  async function signIn(newUser: User) {
    try {
      const { data } = await api.post('/users', { user: newUser })

      setUser({
        ...newUser,
        ...data.user
      })

      if (newUser.type === 'client') {
        router.push('/client')
      } else {
        router.push('/admin')
      }
    } catch (err) {
      throw new Error('Erro na api')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
