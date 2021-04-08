import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Signup from './components/Signup'
import Home from './components/Home'
import { Container } from './components/styled'
import Login from './components/Login'
import { useAuth } from './hooks/useAuth'
import PrivateRoute from './components/PrivateRoute'
import Admin from './components/Admin'

const StyledApp = styled.div``

function App() {
  const { currentUser, logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledApp className="App">
      <Container>
        <Router>
          <nav>
            {currentUser ? currentUser.email : <Link to="/login">login</Link>}
            {currentUser && <button onClick={handleLogout}>logout</button>}
          </nav>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </Container>
    </StyledApp>
  )
}

export default App
