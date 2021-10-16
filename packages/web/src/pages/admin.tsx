import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BiSend, BiExit } from 'react-icons/bi'

import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'

import {
  Container,
  SidebarChat,
  ClientContact,
  ChatContainer,
  ChatContent,
  AdminMessage,
  ClientMessage
} from '../styles/admin'

interface Connection {
  id: string
  adminId: string | null
  clientId: string
  closedAt: Date | null
  client: {
    name: string
    email: string
    socket: string
  }
}

export default function Admin() {
  const { user } = useAuth()

  const [connections, setConnections] = useState([] as Connection[])

  useEffect(() => {
    getAllConnectionsUnclosedByAdminId()
  }, [])

  async function getAllConnectionsUnclosedByAdminId() {
    const { data } = await api.get(`/connections/${user.id}`)

    setConnections(data)
  }

  return (
    <>
      <Head>
        <title>Admin - LixAttendance</title>
      </Head>

      <Container>
        <SidebarChat>
          <header>
            <div>
              <span>Bem vindo(a),</span>
              <h1>{user?.name}</h1>
            </div>

            <Link href="/">
              <BiExit size={35} />
            </Link>
          </header>

          <div>
            {connections.map(connection => (
              <ClientContact key={connection.id}>
                <div>
                  <h4>{connection.client.name}</h4>

                  <p>{connection.client.email}</p>
                </div>

                {connection.adminId !== null ? (
                  <button type="button">Conversar</button>
                ) : (
                  <button type="button">Travar</button>
                )}
              </ClientContact>
            ))}
          </div>
        </SidebarChat>

        <ChatContainer>
          <header>
            <div>
              <span>Cliente</span>
              <h2>Rodrigo Lissone</h2>
            </div>

            {/* <RiArrowGoBackFill size={40} /> */}
          </header>

          <ChatContent>
            <AdminMessage>
              <div>
                <span>
                  Olá gabriesdfsdfsdfsdf sdfsdfsdf sdfs dfsdf sdfsdfsdf
                  sdsdfsdfl
                </span>
              </div>

              <p>19:54</p>
            </AdminMessage>

            <ClientMessage>
              <div>
                <span>Bom dia!</span>
              </div>

              <p>20:22</p>
            </ClientMessage>
          </ChatContent>

          <footer>
            <input maxLength={250} placeholder="Digite sua mensagem aqui" />

            <button type="button">
              Enviar
              <BiSend size={20} />
            </button>
          </footer>
        </ChatContainer>
      </Container>
    </>
  )
}
