import * as firebase from 'firebase/app'

/**
 * Handles automatically signing-in the app if we clicked on the sign-in link in the email.
 */
export function handleSignIn () {
  return new Promise((resolve, reject) => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // You can also get the other parameters passed in the query string such as state=STATE.
      // Get the email if available.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation attacks, ask the
        // user to provide the associated email again. For example:
        email = window.prompt(
          "Please provide the email you'd like to sign-in with for confirmation."
        )
      }
      if (email) {
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then(function (result) {
            // Clear the URL to remove the sign-in link parameters.
            if (window.history && window.history.replaceState) {
              window.history.replaceState(
                {},
                document.title,
                window.location.href.split('?')[0]
              )
            }
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn')
            resolve()
          })
          .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code
            // var errorMessage = error.message
            console.log(error)
            reject()
          })
      }
    }
  })
}
