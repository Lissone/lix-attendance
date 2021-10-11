import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  aside {
    flex: 7;
    padding: 4rem 3rem;

    background: var(--blue-500);

    img {
      height: 32rem;

      margin-bottom: 6rem;
    }

    h1 {
      margin-bottom: 1rem;

      font-size: 3rem;

      color: var(--background);
    }

    span {
      font-size: 1.5rem;

      color: var(--gray-300);
    }
  }

  main {
    flex: 6;
    padding: 2rem 3rem;

    display: flex;
    flex-direction: column;

    header {
      margin-bottom: 4rem;

      display: flex;
      justify-content: flex-end;

      svg {
        cursor: pointer;

        color: var(--gray-blue-500);
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 300px;
        margin-bottom: 3rem;
      }

      span {
        margin-top: 6rem;

        color: var(--gray-blue-500);

        a {
          color: var(--blue-500);

          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.7);
          }
        }
      }
    }

    form {
      width: 26rem;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      input {
        width: 100%;
        padding: 0.8rem 1.5rem;

        border: 1px solid var(--gray-100);
        border-radius: 0.35rem;

        color: var(--gray-blue-800);
        background: var(--light);
      }

      input + input {
        margin-top: 0.5rem;
      }

      > button {
        width: 100%;
        margin-top: 1rem;
        padding: 0.8rem 1.5rem;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        border: 0;
        border-radius: 0.35rem;

        color: var(--gray-blue-800);
        background: var(--green-400);

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`

export const UserTypeContainer = styled.div`
  width: 100%;

  h3 {
    font-size: 1.1rem;
    font-weight: 500;

    color: var(--gray-blue-800);
  }

  div {
    width: 100%;
    margin: 1rem 0;

    display: flex;
    gap: 1rem;
  }
`

interface RadioBoxProps {
  isActive: boolean
}

export const RadioBox = styled.button<RadioBoxProps>`
  width: 100%;
  height: 4rem;

  border: 1px solid var(--gray-100);
  border-radius: 0.35rem;
  border-color: ${props =>
    props.isActive ? 'var(--gray-300)' : 'var(--gray-100)'};

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--gray-blue-800);
  background: ${props => (props.isActive ? 'var(--blue-200)' : 'transparent')};

  transition: border-color 0.2s;

  &:hover {
    border-color: var(--gray-300);
  }
`
