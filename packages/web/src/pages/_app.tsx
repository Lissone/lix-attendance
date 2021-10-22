import io from 'socket.io-client'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { ToastContainer, Slide } from 'react-toastify'

import { AuthProvider } from '../hooks/useAuth'

import { GlobalStyle } from '../styles/global'

const httpServer =
  process.env.NEXT_PUBLIC_BASE_URL_API || 'http://localhost:5000'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(httpServer, { transports: ['websocket'] })

    setSocket(newSocket)
  }, [])

  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          transition={Slide}
          pauseOnHover={false}
        />

        <Component socket={socket} {...pageProps} />
      </AuthProvider>
    </>
  )
}
