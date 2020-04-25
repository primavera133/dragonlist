import React, { useState } from 'react'
import * as firebase from 'firebase/app'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { isProfileComplete } from '../../helpers/completeProfile'

const isNameValid = n => {
  return !!n.length
  //   setValidName(!!n.length)
}

const isEmailValid = e => {
  return !!e.length
  //   setValidEmail(!!e.length)
}

export const Profile = () => {
  const user = firebase.auth().currentUser

  const [name, setName] = useState(user.displayName || '')
  const [validName, setValidName] = useState(isNameValid(name))
  const [nameUpdatedSuccess, setNameUpdatedSuccess] = useState(false)
  const [nameUpdatedFail, setNameUpdatedFail] = useState(false)

  const [email, setEmail] = useState(user.email)
  const [validEmail, setValidEmail] = useState(isEmailValid(email))
  const [emailUpdatedSuccess, setEmailUpdatedSuccess] = useState(false)
  const [emailUpdatedFail, setEmailUpdatedFail] = useState(false)

  const [completeProfile, setCompleteProfile] = useState(
    isProfileComplete(user)
  )

  const updateProfile = e => {
    e.preventDefault()
    if (name !== user.displayName) {
      user
        .updateProfile({
          displayName: name
        })
        .then(function () {
          setCompleteProfile(isProfileComplete(user))
          setNameUpdatedSuccess(true)
          window.setTimeout(() => {
            setNameUpdatedSuccess(false)
          }, 3000)
        })
        .catch(function (error) {
          console.log(error)
          setNameUpdatedFail(true)
          window.setTimeout(() => {
            setNameUpdatedFail(false)
          }, 3000)
        })
    }
    if (email !== user.email) {
      user
        .updateEmail(email)
        .then(function () {
          setCompleteProfile(isProfileComplete(user))
          setEmailUpdatedSuccess(true)
          window.setTimeout(() => {
            setEmailUpdatedSuccess(false)
          }, 3000)
        })
        .catch(function (error) {
          console.log(error)
          setEmailUpdatedFail(true)
          window.setTimeout(() => {
            setEmailUpdatedFail(false)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      {completeProfile ? (
        <p>
          You have a complete profile! You can still change the info here if you
          wish.
        </p>
      ) : (
        <p className='text-danger'>Please complete your profile!</p>
      )}
      <Form.Group controlId='formEmail'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          isValid={validName}
          isInvalid={!validName}
          placeholder='Your name'
          value={name}
          onChange={e => {
            setName(e.target.value)
            setValidName(isNameValid(e.target.value))
          }}
        />
        {nameUpdatedSuccess ? (
          <Form.Text className='text-success'>Name has been updated</Form.Text>
        ) : null}
        {nameUpdatedFail ? (
          <Form.Text className='text-danger'>
            Something went wrong, try again.
          </Form.Text>
        ) : null}
      </Form.Group>

      <Form onSubmit={updateProfile}>
        <Form.Group controlId='formName'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Email address'
            isValid={validEmail}
            isInvalid={!validEmail}
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setValidEmail(isEmailValid(e.target.value))
            }}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
          {emailUpdatedSuccess ? (
            <Form.Text className='text-success'>
              Email has been updated
            </Form.Text>
          ) : null}
          {emailUpdatedFail ? (
            <Form.Text className='text-danger'>
              Something went wrong, try again.
            </Form.Text>
          ) : null}
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
