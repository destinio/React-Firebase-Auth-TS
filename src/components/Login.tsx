import { FormEvent, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login } = useAuth()
  const history = useHistory()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    let email = emailRef.current?.value!
    let password = passwordRef.current?.value!
    try {
      await login(email, password)
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          ref={emailRef}
          required
          autoComplete="false"
          placeholder="enter email"
        />
        <input
          type="password"
          ref={passwordRef}
          autoComplete="false"
          required
          placeholder="enter password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  )
}
