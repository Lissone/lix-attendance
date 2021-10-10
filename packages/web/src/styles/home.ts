import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  aside {
    flex: 7;
    padding: 4rem 3rem;

    background: var(--blue-500);

    div {
      height: 30rem;
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

        border: 1.5px solid var(--gray-800);
        border-radius: 0.35rem;

        color: var(--gray-blue-800);
        background: var(--light);
      }

      button {
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
