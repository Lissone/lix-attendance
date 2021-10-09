import Head from 'next/head'
import { BiSend } from 'react-icons/bi'
import { RiArrowGoBackFill } from 'react-icons/ri'

import styles from '../styles/client.module.scss'

export default function Client() {
  return (
    <>
      <Head>
        <title>Cliente help - LixAttendance</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.chatCard}>
          <header>
            <div>
              <span>Atendente</span>
              <h2>Leonardo Dias Lissone</h2>
            </div>

            <RiArrowGoBackFill size={40} />
          </header>

          <div className={styles.chat}>
            <div className={styles.information}>
              <h4>
                Envie sua dúvida para nossos atendentes e aguarde eles
                retornarem com a resposta
              </h4>
            </div>

            <div className={styles.adminMessage}>
              <div>
                <span>
                  Olá gabriesdfsdfsdfsdf sdfsdfsdf sdfs dfsdf sdfsdfsdf
                  sdsdfsdfl
                </span>
              </div>

              <p>19:54</p>
            </div>

            <div className={styles.clientMessage}>
              <div>
                <span>Bom dia!</span>
              </div>

              <p>20:22</p>
            </div>
          </div>

          <footer>
            <input maxLength={250} placeholder="Digite sua mensagem aqui" />

            <button type="button">
              Enviar
              <BiSend size={20} />
            </button>
          </footer>
        </div>
      </main>
    </>
  )
}
