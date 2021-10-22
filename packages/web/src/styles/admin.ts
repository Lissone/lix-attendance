import styled from 'styled-components'

export const Container = styled.main`
  height: 100vh;

  display: flex;
  justify-content: center;

  background: var(--blue-200);
`

export const SidebarChat = styled.aside`
  width: 30rem;

  header {
    padding: 2rem 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--blue-400);

    h1 {
      font-size: 1.5rem;

      color: var(--light);
    }

    svg {
      cursor: pointer;

      color: var(--gray-100);

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  > div {
    height: calc(100vh - 113px);

    overflow-y: scroll;

    background: var(--gray-100);
  }
`

export const ClientContact = styled.div`
  padding: 2rem;

  display: flex;
  justify-content: space-between;

  color: var(--gray-600);
  background: var(--background);

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
`

interface ButtonContactProps {
  backgroundColor: 'green' | 'blue'
}

const colors = {
  green: 'var(--green-400)',
  blue: 'var(--blue-200)'
}

export const ButtonContact = styled.button<ButtonContactProps>`
  padding: 0.8rem 0;
  width: 8.5rem;

  border: 1px solid var(--gray-600);
  border-radius: 0.35rem;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;

  color: var(--gray-blue-800);
  background: ${props =>
    props.backgroundColor ? colors[props.backgroundColor] : 'transparent'};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`

export const ChatContainer = styled.div`
  height: 100%;
  width: 50rem;

  display: flex;
  flex-direction: column;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

  background: var(--light);

  header {
    padding: 2rem 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    background: var(--blue-400);

    span {
      color: var(--background);
    }

    h2 {
      color: var(--light);
    }

    button {
      padding: 0.8rem 1.5rem;

      display: flex;
      align-items: center;
      gap: 0.5rem;

      border: 0;
      border-radius: 0.35rem;

      color: var(--light);
      background: var(--red-200);

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  footer {
    width: 50rem;
    padding: 1rem 2rem;

    display: flex;
    align-items: flex-start;
    gap: 1rem;

    position: absolute;
    bottom: 0;

    input {
      height: 100%;
      width: 100%;
      padding: 1rem 1.5rem;

      border-radius: 0.5rem;
      border: 1.5px solid var(--gray-blue-500);

      color: var(--gray-blue-800);
    }

    button {
      padding: 1rem 1.5rem;

      display: flex;
      align-items: center;
      gap: 0.5rem;

      border-radius: 0.5rem;
      border: 0;

      background: var(--blue-500);

      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`

export const ChatEmpty = styled.div`
  height: 100%;
  width: 50rem;
  padding-top: 12rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

  background: var(--light);

  span {
    width: 60%;
    margin-top: 2rem;

    color: var(--gray-blue-500);

    font-size: 1.8rem;
    text-align: center;
  }
`

export const ChatContent = styled.div`
  height: 100%;
  padding: 0 1rem;
  margin-bottom: 5.5rem;

  overflow-y: scroll;
`

export const AdminMessage = styled.div`
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    width: 60%;
    padding: 1rem;

    word-wrap: break-word;
    line-height: 1.6rem;
    border-radius: 1rem 1rem 1rem 0;

    background: var(--gray-600);
  }

  p {
    margin-top: 0.5rem;
    margin-left: 0.5rem;

    color: var(--gray-600);
  }
`

export const ClientMessage = styled.div`
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    width: 60%;
    padding: 1rem;

    word-wrap: break-word;
    line-height: 1.6rem;
    border-radius: 1rem 1rem 0 1rem;

    background: var(--blue-400);
  }

  p {
    margin-top: 0.5rem;
    margin-right: 0.5rem;

    color: var(--gray-600);
  }
`
