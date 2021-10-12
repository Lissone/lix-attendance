/* eslint-disable react/jsx-no-bind */
import Head from 'next/head'
import { useState, useRef } from 'react'
import * as Yup from 'yup'
import { BsBoxArrowRight } from 'react-icons/bs'
import { FiHelpCircle } from 'react-icons/fi'

import { useAuth } from '../hooks/useAuth'

import { Input } from '../components/Input'

import { Container, Form, UserTypeContainer, RadioBox } from '../styles/home'

interface SignInData {
  email: string
  name: string
}

export default function Home({ socket }: any) {
  const { signIn } = useAuth()

  const formRef = useRef(null)
  const [type, setType] = useState('client')

  async function handleSubmit(data: SignInData, { reset }) {
    try {
      const socketId = socket.id

      const schema = Yup.object().shape({
        name: Yup.string()
          .min(5, 'Mínimo 4 caracteres')
          .required('Nome obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .required('Email é obrigatório')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const newUser = {
        type,
        ...data,
        socket: socketId
      }

      await signIn(newUser)

      formRef.current.setErrors({})
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      } else {
        reset()
      }
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

            <Form ref={formRef} onSubmit={handleSubmit}>
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

              <Input name="name" placeholder="Digite seu nome" />
              <Input name="email" placeholder="Digite seu email" />

              <button type="submit">
                Entrar
                <BsBoxArrowRight size={20} />
              </button>
            </Form>

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
