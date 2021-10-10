import Head from 'next/head'
import { BiSend } from 'react-icons/bi'
import { RiArrowGoBackFill } from 'react-icons/ri'

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
              <h1>Leonardo Dias Lissone</h1>
            </div>

            <RiArrowGoBackFill size={35} />
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
