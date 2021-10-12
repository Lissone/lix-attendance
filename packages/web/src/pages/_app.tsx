import io from 'socket.io-client'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { AuthProvider } from '../hooks/useAuth'

import { GlobalStyle } from '../styles/global'

const httpServer = process.env.API_HOST || 'http://localhost:5000'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(httpServer, { transports: ['websocket'] })

    setSocket(newSocket)
  }, [])

  return (
    <>
      <GlobalStyle />

      {socket ? (
        <AuthProvider>
          <Component socket={socket} {...pageProps} />
        </AuthProvider>
      ) : (
        <h1>Error to connect on server</h1>
      )}
    </>
  )
}
