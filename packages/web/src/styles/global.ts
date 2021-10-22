import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --red-300: #DF2E2E;
    --red-200: #FF4F4B;

    --blue-200: #A2D2FF;
    --blue-500: #3D56B2;
    --blue-400: #5C7AEA;

    --green-400: #57CC99;

    --gray-blue-800: #393E46;
    --gray-blue-500: #787A91;

    --gray-800: #494949;
    --gray-600: #707070;
    --gray-300: #b3b3b3;
    --gray-100: #D7D7D7;
    
    --light: #F7F6F2;
    --background: #E6E6E6;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; //15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; //14px
    }
  }

  @media (max-width: 450px) {
    html {
      font-size: 81.25%; //13px
    }
  }

  body {
    background: var(--background);
  }

  body, input, textarea, button {
    font: 500 1rem Inter, sans-serif;
    color: var(--light);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: var(--gray-800);
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button, a {
    text-decoration: none;
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
