import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/react'
import { AuthProvider } from './hooks/useAuth'
import App from './App'

const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Global styles={GlobalStyles} />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
