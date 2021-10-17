/* eslint-disable no-console */
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { format, parseISO, getTime } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { BiSend, BiExit } from 'react-icons/bi'

import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'

import {
  Container,
  SidebarChat,
  ClientContact,
  ButtonContact,
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

interface Message {
  id?: string
  adminId: string
  clientId: string
  text: string
  createdHour?: string
  admin?: {
    name: string
  }
}

export default function Admin({ socket }: any) {
  const { user } = useAuth()

  const [load, setLoad] = useState(false)
  const [connections, setConnections] = useState([] as Connection[])
  const [connectionsUnclosed, setConnectionsUnclosed] = useState(
    [] as Connection[]
  )
  const [connectionSelected, setConnectionSelected] = useState<Connection>(null)
  const [messages, setMessages] = useState([] as Message[])

  useEffect(() => {
    if (!load) {
      getAllConnections()

      setLoad(true)
    }

    if (connectionSelected) {
      getAllMessages()
    }
  }, [connectionSelected])

  useEffect(() => {
    socket.on('admin_list_clients_without_admin', connectionsWithoutAdmin => {
      const allConnections = [
        ...connectionsWithoutAdmin,
        ...connectionsUnclosed
      ].sort(
        (a, b) =>
          getTime(new Date(b.createdAt)) - getTime(new Date(a.createdAt))
      )

      setConnections(allConnections)
    })

    return () => socket.off('admin_list_clients_without_admin')
  }, [connections, connectionsUnclosed])

  function getAllConnections() {
    socket.emit(
      'admin_list_all_clients',
      { adminId: user.id },
      newConnections => {
        const allConnections = [
          ...newConnections.connectionsWithoutAdmin,
          ...newConnections.connectionsUnclosed
        ].sort(
          (a, b) =>
            getTime(new Date(b.createdAt)) - getTime(new Date(a.createdAt))
        )

        setConnectionsUnclosed(connectionsUnclosed)
        setConnections(allConnections)
      }
    )
  }

  async function getAllMessages() {
    try {
      const { data } = await api.get(`/connections/${connectionSelected.id}`)

      const messagesFormated = data.messages.map(message => ({
        id: message.id,
        adminId: message.adminId,
        clientId: message.clientId,
        text: message.text,
        createdHour: format(parseISO(message.createdAt), 'HH:mm', {
          locale: ptBR
        })
      }))

      console.log(messagesFormated)

      setMessages(messagesFormated)
    } catch (err) {
      console.log(err)
    }
  }

  function handleConnectWithClient(connection: Connection) {
    const params = {
      clientId: connection.clientId,
      adminId: user.id
    }

    socket.emit('admin_in_support', params, newConnectionsUnclosed => {
      setConnectionsUnclosed(newConnectionsUnclosed)

      setConnectionSelected(connection)
    })
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
                  <ButtonContact
                    type="button"
                    backgroundColor="green"
                    onClick={() => setConnectionSelected(connection)}
                  >
                    Conversar
                  </ButtonContact>
                ) : (
                  <ButtonContact
                    type="button"
                    backgroundColor="blue"
                    onClick={() => handleConnectWithClient(connection)}
                  >
                    Conectar
                  </ButtonContact>
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
