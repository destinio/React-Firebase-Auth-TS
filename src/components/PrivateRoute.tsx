import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface PrivateRouteProps extends RouteProps {
  // component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
  // component is optional on RouteComponentProps and you need to make it required so it is the above or
  // or the && Component on line 20.
  // It needs to be required or you get (JSX element type 'Component' does not have any construct or call signatures.ts(2604))
}

export default function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser && Component ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
