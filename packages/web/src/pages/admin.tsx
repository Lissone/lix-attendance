import Head from 'next/head'
import { BiSend } from 'react-icons/bi'
import { RiArrowGoBackFill } from 'react-icons/ri'

import styles from '../styles/admin.module.scss'

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin - LixAttendance</title>
      </Head>

      <main className={styles.container}>
        <aside className={styles.sidebar}>
          <header>
            <div>
              <span>Bem vindo(a),</span>
              <h1>Leonardo Dias Lissone</h1>
            </div>

            <RiArrowGoBackFill size={35} />
          </header>

          <div>
            <div className={styles.clientContact}>
              <div>
                <h4>Rodrigo Lissone</h4>

                <p>rodrigolissone@gmail.com</p>
              </div>

              <button type="button">Conversar</button>
            </div>

            <div className={styles.clientContact}>
              <div>
                <h4>Fernanda Mendonça</h4>

                <p>fernanda@gmail.com</p>
              </div>

              <button type="button">Conversar</button>
            </div>
          </div>
        </aside>

        <div className={styles.chatCard}>
          <header>
            <div>
              <span>Cliente</span>
              <h2>Rodrigo Lissone</h2>
            </div>

            {/* <RiArrowGoBackFill size={40} /> */}
          </header>

          <div className={styles.chat}>
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
