import { createContext, useContext, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { api } from '../services/api'

interface User {
  id?: string
  type: string
  name: string
  email: string
  socket: string
  connectionId?: string
  createdAt?: Date
}

interface UserResponse {
  user: User
  connectionId?: string
}

interface ErrorResponse {
  response: {
    status: number
  }
}

interface AuthContextType {
  user: User | null
  signIn: (user: User) => Promise<void>
  updateClientConnection: (connectionId: string) => void
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
      const { data } = await api.post<UserResponse>('/users', { user: newUser })

      setUser({
        ...newUser,
        ...data.user,
        connectionId: data.connectionId
      })

      if (newUser.type === 'client') {
        router.push('/client')
      } else {
        router.push('/admin')
      }
    } catch (err: ErrorResponse | any) {
      if (err.response.status === 406) {
        toast.error(
          'Email já está cadastrado como usuário oposto do selecionado.',
          {
            hideProgressBar: true
          }
        )

        throw new Error('Usuário não pode ser cadastrado')
      } else {
        throw new Error('Erro na api')
      }
    }
  }

  function updateClientConnection(connectionId: string) {
    setUser({
      ...user,
      connectionId
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        updateClientConnection
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
