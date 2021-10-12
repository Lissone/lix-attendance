import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { format, parseISO } from 'date-fns'
import { BiSend, BiExit } from 'react-icons/bi'

import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'

import {
  Container,
  ChatContainer,
  ChatContent,
  Information,
  AdminMessage,
  ClientMessage
} from '../styles/client'

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

export default function Client({ socket }: any) {
  const { user } = useAuth()

  const [messages, setMessages] = useState([] as Message[])
  const [text, setText] = useState('')

  useEffect(() => {
    getAllMessages()
  }, [])

  async function getAllMessages() {
    const { data } = await api.get(`/messages/${user.id}`, {
      params: {
        _sort: 'createdAt',
        _order: 'asc'
      }
    })

    const messagesFormated = data.map(message => ({
      id: message.id,
      adminId: message.adminId,
      clientId: message.clientId,
      text: message.text,
      createdHour: format(parseISO(message.createdAt), 'HH:mm', {
        locale: ptBR
      })
    }))

    setMessages(messagesFormated)
  }

  function handleSendMessage() {
    try {
      const params = {
        clientId: user.id,
        adminId: messages[0]?.adminId,
        text
      }

      socket.emit('client_send_to_admin', params)

      const message = {
        ...params,
        createdHour: format(new Date(), 'HH:mm', {
          locale: ptBR
        })
      }

      setMessages([...messages, message])
      setText('')
    } catch (err) {
      console.error(err)
    }
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
              {messages[0]?.admin ? (
                <h2>{messages[0]?.admin.name}</h2>
              ) : (
                <h2>Aguardando atendimento...</h2>
              )}
            </div>

            <Link href="/">
              <BiExit size={40} />
            </Link>
          </header>

          <ChatContent>
            {messages.length <= 0 && (
              <Information>
                <h4>
                  Envie sua dúvida para nossos atendentes e aguarde eles
                  retornarem com a resposta
                </h4>
              </Information>
            )}

            {messages.map(message =>
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
              maxLength={250}
              placeholder="Digite sua mensagem aqui"
            />

            <button type="button" onClick={handleSendMessage}>
              Enviar
              <BiSend size={20} />
            </button>
          </footer>
        </ChatContainer>
      </Container>
    </>
  )
}
