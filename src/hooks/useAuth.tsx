import React from 'react'
import { auth } from '../firebase'

interface ContextTypes {
  signup: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>
  login: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>
  logout: () => Promise<void>
  currentUser: firebase.default.User | null
}

const AuthContext = React.createContext<ContextTypes>(null!)

export function useAuth() {
  return React.useContext(AuthContext)
}

interface Props {
  children: JSX.Element
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = React.useState<firebase.default.User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsub
  }, [])

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
