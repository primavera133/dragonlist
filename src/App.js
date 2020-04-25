import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
import { handleSignIn } from './helpers/handleSignIn'

import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { PublicRoute } from './components/PublicRoute'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './components/Home'
import { Loading } from './components/Loading'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Dashboard } from './components/protected/Dashboard'
import { Profile } from './components/protected/Profile'

import './App.css'
import './bootstrap.css'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAppAuth = firebaseApp.auth()
const providers = {
  emailProvider: new firebase.auth.EmailAuthProvider()
}

function App ({ user, loading }) {
  const [hasHandledSignIn, setHasHandledSignIn] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  const logout = () => {
    return firebase.auth().signOut()
  }

  useEffect(() => {
    if (!hasHandledSignIn) {
      handleSignIn()
        .then(() => {
          setIsAuthed(true)
        })
        .catch(err => {
          setIsAuthed(false)
        })
        .finally(() => setHasHandledSignIn(true))
    }

    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthed(true)
      } else {
        setIsAuthed(false)
      }
    })
  }, [hasHandledSignIn, user])

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <div>
        <Navbar bg='light' expand='lg'>
          <LinkContainer to='/'>
            <Navbar.Brand>Dragonlist</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {user ? (
                <>
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/profile'>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <Button
                    variant='link'
                    onClick={() => {
                      logout()
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className='container'>
          <div className='row'>
            <Switch>
              <Route path='/' exact component={Home} />
              <PublicRoute authed={isAuthed} path='/login' component={Login} />
              <PublicRoute
                authed={isAuthed}
                path='/register'
                component={Register}
              />
              <PrivateRoute
                authed={isAuthed}
                path='/dashboard'
                component={Dashboard}
              />
              <PrivateRoute
                authed={isAuthed}
                path='/profile'
                component={Profile}
              />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App)
