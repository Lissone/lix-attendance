import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { BsBoxArrowRight } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'

import styles from '../styles/home.module.scss'

export default function Home() {
  const [email, setEmail] = useState('')

  function handleSignIn(event: FormEvent) {
    event.preventDefault()

    console.log(email)
  }

  return (
    <>
      <Head>
        <title>Home - LixAttendance</title>
      </Head>

      <div className={styles.container}>
        <aside>
          <div />

          <h1>Melhor chat online de suporte ao usuário</h1>

          <span>
            Você pode testar nosso serviço por conta própria, escolhendo seu
            tipo de usuário e entrando em nossa plataforma.
          </span>
        </aside>

        <main>
          <header>
            <FiHelpCircle size={30} />
          </header>

          <div className={styles.content}>
            <img src="/logo.svg" alt="LixAttendance" />

            <form onSubmit={handleSignIn}>
              <input
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Digite seu email"
              />

              <button type="submit">
                Entrar
                <BsBoxArrowRight size={20} />
              </button>
            </form>

            <span>
              Desenvolvido por{' '}
              <a
                target="_blank"
                href="https://www.github.com/Lissone"
                rel="noreferrer"
              >
                Lissone
              </a>
            </span>
          </div>
        </main>
      </div>
    </>
  )
}
