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
  ChatEmpty,
  ChatContent,
  AdminMessage,
  ClientMessage
} from '../styles/admin'

interface Connection {
  id: string
  adminId: string | null
  clientId: string
  closedAt: Date | null
  messages?: Message[]
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
}

export default function Admin({ socket }: any) {
  const { user } = useAuth()

  const [load, setLoad] = useState(false)
  const [connections, setConnections] = useState([] as Connection[])
  const [connectionsUnclosed, setConnectionsUnclosed] = useState(
    [] as Connection[]
  )
  const [connectionSelected, setConnectionSelected] = useState<Connection>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    if (!load) {
      getAllConnections()

      setLoad(true)
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

    socket.on('admin_receive_message', ({ clientId, message }) => {
      console.log(connectionSelected)

      if (connectionSelected.clientId === clientId) {
        const messageFormatted = {
          id: message.id,
          adminId: message.adminId,
          clientId: message.clientId,
          text: message.text,
          createdHour: format(parseISO(message.createdAt), 'HH:mm', {
            locale: ptBR
          })
        }

        const newMessages = [...connectionSelected.messages, messageFormatted]

        setConnectionSelected({
          ...connectionSelected,
          messages: newMessages
        })
      }
    })

    return () => {
      socket.off('admin_list_clients_without_admin')
      socket.off('admin_receive_message')
    }
  }, [connections, connectionsUnclosed, connectionSelected])

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

  function handleSelectConnection(connectionId: string) {
    api.get(`/connections/${connectionId}`).then(({ data }) => {
      const messagesFormated = data.messages.map(message => ({
        id: message.id,
        adminId: message.adminId,
        clientId: message.clientId,
        text: message.text,
        createdHour: format(parseISO(message.createdAt), 'HH:mm', {
          locale: ptBR
        })
      }))

      setConnectionSelected({
        ...data,
        messages: messagesFormated
      })
    })
  }

  async function handleConnectWithClient(connectionId: string) {
    const { data } = await api.get(`/connections/${connectionId}`)

    const messagesFormated = data.messages.map(message => ({
      id: message.id,
      adminId: message.adminId,
      clientId: message.clientId,
      text: message.text,
      createdHour: format(parseISO(message.createdAt), 'HH:mm', {
        locale: ptBR
      })
    }))

    const params = {
      clientId: data.clientId,
      adminId: user.id
    }

    socket.emit('admin_in_support', params, newConnectionsUnclosed => {
      setConnectionsUnclosed(newConnectionsUnclosed)

      setConnectionSelected({
        ...data,
        messages: messagesFormated
      })
    })
  }

  function handleSendMessage() {
    try {
      const params = {
        connectionId: connectionSelected.id,
        clientId: connectionSelected.clientId,
        adminId: user.id,
        text
      }

      socket.emit('admin_send_message', params)

      const message = {
        ...params,
        createdHour: format(new Date(), 'HH:mm', {
          locale: ptBR
        })
      }

      const newMessages = [...connectionSelected.messages, message]

      setConnectionSelected({
        ...connectionSelected,
        messages: newMessages
      })

      setText('')
    } catch (err) {
      console.error(err)
    }
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
                    onClick={() => handleSelectConnection(connection.id)}
                  >
                    Conversar
                  </ButtonContact>
                ) : (
                  <ButtonContact
                    type="button"
                    backgroundColor="blue"
                    onClick={() => handleConnectWithClient(connection.id)}
                  >
                    Conectar
                  </ButtonContact>
                )}
              </ClientContact>
            ))}
          </div>
        </SidebarChat>
        {connectionSelected ? (
          <ChatContainer>
            <header>
              <div>
                <span>Cliente</span>
                <h2>{connectionSelected.client.name}</h2>
              </div>

              {/* <RiArrowGoBackFill size={40} /> */}
            </header>

            <ChatContent>
              {connectionSelected.messages.map(message =>
                message.adminId === null || message.adminId === undefined ? (
                  <ClientMessage key={message.id}>
                    <div>
                      <span>{message.text}</span>
                    </div>

                    <p>{message.createdHour}</p>
                  </ClientMessage>
                ) : (
                  <AdminMessage key={message.id}>
                    <div>
                      <span>{message.text}</span>
                    </div>

                    <p>{message.createdHour}</p>
                  </AdminMessage>
                )
              )}
            </ChatContent>

            <footer>
              <input
                value={text}
                onChange={event => setText(event.target.value)}
                placeholder="Digite sua mensagem aqui"
              />

              <button type="button" onClick={handleSendMessage}>
                Enviar
                <BiSend size={20} />
              </button>
            </footer>
          </ChatContainer>
        ) : (
          <ChatEmpty>
            <h1>Escolha um usuário para tirar as dúvidas dele</h1>
          </ChatEmpty>
        )}
      </Container>
    </>
  )
}
