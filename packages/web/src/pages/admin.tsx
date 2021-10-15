import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
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

export default function Admin() {
  const { user } = useAuth()

  useEffect(() => {

  }, [])

  function getConnectionsAlredyEstablished() {
    const { data } = api.
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
            <ClientContact>
              <div>
                <h4>Rodrigo Lissone</h4>

                <p>rodrigolissone@gmail.com</p>
              </div>

              <button type="button">Conversar</button>
            </ClientContact>

            <ClientContact>
              <div>
                <h4>Fernanda Mendonça</h4>

                <p>fernanda@gmail.com</p>
              </div>

              <button type="button">Conversar</button>
            </ClientContact>
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
