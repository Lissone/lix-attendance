/* eslint-disable no-console */
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { BiSend, BiExit } from 'react-icons/bi'

import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'

import {
  Container,
  ChatContainer,
  ChatContent,
  Information,
  AdminMessage,
  ClientMessage,
  ClosedConnection
} from '../styles/client'

interface User {
  id: string
  name: string
  email: string
  socket?: string
}

interface Connection {
  id: string
  adminId: string | null
  clientId: string
  closedAt: string
  messages: Message[]
  admin: User
  client: User
}

interface Message {
  id?: string
  adminId: string
  clientId: string
  text: string
  createdHour?: string
  createdAt?: string
  updatedAt?: string
}

export default function Client({ socket }: any) {
  const { user, updateClientConnection } = useAuth()

  const [connection, setConnection] = useState({} as Connection)
  const [text, setText] = useState('')

  useEffect(() => {
    if (user.connectionId) {
      getAllMessages()
    }
  }, [])

  useEffect(() => {
    socket.on('admin_connect_with_client', ({ admin }) => {
      setConnection({
        ...connection,
        admin
      })
    })

    socket.on('admin_close_connection_with_client', response => {
      setConnection(prevState => ({
        ...prevState,
        closedAt: response.connection.closedAt
      }))
    })

    socket.on('admin_send_to_client', ({ message }) => {
      const messageFormatted = {
        ...message,
        createdHour: format(parseISO(message.createdAt), 'HH:mm', {
          locale: ptBR
        })
      }

      const newMessages = [...connection.messages, messageFormatted]

      setConnection({
        ...connection,
        messages: newMessages
      })
    })

    return () => {
      socket.off('admin_connect_with_client')
      socket.off('admin_send_to_client')
    }
  }, [connection])

  async function getAllMessages() {
    try {
      const { data } = await api.get<Connection>(
        `/connections/${user.connectionId}`
      )

      const messagesFormatted = data.messages.map(message => ({
        ...message,
        createdHour: format(parseISO(message.createdAt), 'HH:mm', {
          locale: ptBR
        })
      }))

      setConnection({
        ...data,
        messages: messagesFormatted
      })
    } catch (err) {
      console.error(err)
    }
  }

  function handleSendMessage() {
    try {
      const params = {
        connectionId: user.connectionId,
        clientId: user.id,
        adminId: connection.admin?.id,
        text
      }

      socket.emit('client_send_to_admin', params, connectionId => {
        updateClientConnection(connectionId)
      })

      const message = {
        ...params,
        adminId: null,
        createdHour: format(new Date(), 'HH:mm', {
          locale: ptBR
        })
      }

      let newMessages

      if (connection.messages) {
        newMessages = [...connection.messages, message]
      } else {
        newMessages = [message]
      }

      setConnection(prevState => ({
        ...prevState,
        messages: newMessages
      }))

      setText('')
    } catch (err) {
      console.error(err)
    }
  }

  function handleReopenConnection() {
    socket.emit('client_reopen_connection', connection.id)

    setConnection(prevState => ({
      ...prevState,
      closedAt: null
    }))
  }

  return (
    <>
      <Head>
        <title>Cliente help - LixAttendance</title>
      </Head>

      <Container>
        <ChatContainer>
          <header>
            <div>
              <span>Atendente</span>
              {connection.admin ? (
                <h2>{connection.admin.name}</h2>
              ) : (
                <h2>Aguardando atendimento...</h2>
              )}
            </div>

            <Link href="/">
              <a>
                <BiExit size={40} />
              </a>
            </Link>
          </header>

          <ChatContent>
            {connection.messages?.length <= 0 && (
              <Information>
                <h4>
                  Envie sua dúvida para nossos atendentes e aguarde eles
                  retornarem com a resposta
                </h4>
              </Information>
            )}

            {connection.messages?.map(message =>
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

            {connection.closedAt && (
              <ClosedConnection>
                <h3>Admin fechou a conexão</h3>
                <span>
                  Se suas dúvidas ainda não foram respondidas, abra novamente a
                  conexão com seu admin responsável.
                </span>

                <button type="button" onClick={handleReopenConnection}>
                  Reabrir chamado
                </button>
              </ClosedConnection>
            )}
          </ChatContent>

          <footer>
            <input
              value={text}
              onChange={event => setText(event.target.value)}
              placeholder="Digite sua mensagem aqui"
              disabled={!!connection.closedAt}
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!!connection.closedAt}
            >
              Enviar
              <BiSend size={20} />
            </button>
          </footer>
        </ChatContainer>
      </Container>
    </>
  )
}
