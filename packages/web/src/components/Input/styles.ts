import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
`

export const InputContainer = styled.input`
  width: 100%;
  padding: 0.8rem 1.5rem;

  border: 1px solid var(--gray-100);
  border-radius: 0.35rem;

  color: var(--gray-blue-800);
  background: var(--light);
`

export const Error = styled.div`
  margin: 0.8rem 0.5rem;

  font-weight: 400;

  color: var(--red-300);
`
