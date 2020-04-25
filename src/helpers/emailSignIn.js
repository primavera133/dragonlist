import * as firebase from 'firebase/app'
import actionCodeSettings from './actionCodeSettings'

export const emailSignIn = email => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function () {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email)
        resolve()
      })
      .catch(function (error) {
        console.log(error)
        // Some error occurred, you can inspect the code: error.code
        reject()
      })
  })
}
