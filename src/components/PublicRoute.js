import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export function PublicRoute ({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to='/dashboard' />
        )
      }
    />
  )
}
