import React, { useState } from 'react'
import { emailSignIn } from '../helpers/emailSignIn'

export const Login = () => {
  const [email, setEmail] = useState(false)
  const [emailWasSent, setEmailWasSent] = useState(false)

  const signIn = () => {
    if (!email) return
    emailSignIn(email).then(() => setEmailWasSent(true))
  }

  return (
    <div>
      <h1>Login</h1>
      <h2 className='h5'>Please sign in.</h2>
      {emailWasSent ? (
        <div>Check your email</div>
      ) : (
        <div>
          <label htmlFor='signinemail'>Enter your e-mail</label>
          <input
            id='signinemail'
            type='email'
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={signIn}>Send sign-in link to email</button>
        </div>
      )}
    </div>
  )
}
