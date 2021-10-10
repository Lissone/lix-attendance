import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { BsBoxArrowRight } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'

import { Container, UserTypeContainer, RadioBox } from '../styles/home'

export default function Home() {
  const [type, setType] = useState('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  function handleSignIn(event: FormEvent) {
    event.preventDefault()

    const user = {
      type,
      name,
      email
    }

    console.log(user)

    if (type === 'client') {
      router.push('/client')
    } else {
      router.push('/admin')
    }
  }

  return (
    <>
      <Head>
        <title>Home - LixAttendance</title>
      </Head>

      <Container>
        <aside>
          <img src="/attendance-banner.png" alt="Atendimento" />

          <h1>Melhor chat online de suporte ao usuário</h1>

          <span>
            Você pode testar nosso serviço por conta própria, escolhendo seu
            tipo de usuário e entrando em nossa plataforma.
          </span>
        </aside>

        <main>
          <header>
            <FiHelpCircle size={40} />
          </header>

          <div>
            <img src="/logo.svg" alt="LixAttendance" />

            <form onSubmit={handleSignIn}>
              <UserTypeContainer>
                <h3>Escolha seu tipo de usuário</h3>

                <div>
                  <RadioBox
                    type="button"
                    onClick={() => setType('client')}
                    isActive={type === 'client'}
                  >
                    Cliente
                  </RadioBox>

                  <RadioBox
                    type="button"
                    onClick={() => setType('admin')}
                    isActive={type === 'admin'}
                  >
                    Admin
                  </RadioBox>
                </div>
              </UserTypeContainer>

              <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Digite seu nome"
              />

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
      </Container>
    </>
  )
}
