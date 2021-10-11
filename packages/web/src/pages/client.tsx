import Head from 'next/head'
import Link from 'next/link'
import { BiSend, BiExit } from 'react-icons/bi'

import {
  Container,
  ChatContainer,
  ChatContent,
  Information,
  AdminMessage,
  ClientMessage
} from '../styles/client'

export default function Client() {
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
              <h2>Leonardo Dias Lissone</h2>
            </div>

            <Link href="/">
              <BiExit size={40} />
            </Link>
          </header>

          <ChatContent>
            <Information>
              <h4>
                Envie sua dúvida para nossos atendentes e aguarde eles
                retornarem com a resposta
              </h4>
            </Information>

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
