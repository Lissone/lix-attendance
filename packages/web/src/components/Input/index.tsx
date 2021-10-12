import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { Container, InputContainer, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export function Input({ name, ...rest }: InputProps) {
  const inputRef = useRef(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container>
      <InputContainer ref={inputRef} onChange={e => e.target.value} {...rest} />

      {error && <Error>{error}</Error>}
    </Container>
  )
}
