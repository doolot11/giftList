// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBqM7EpOmifwcDMNNm1GHRlcA-U9lRTuFs',
    authDomain: 'auth-fc0ad.firebaseapp.com',
    projectId: 'auth-fc0ad',
    storageBucket: 'auth-fc0ad.appspot.com',
    messagingSenderId: '778823706107',
    appId: '1:778823706107:web:e471decc9f9bac6665975e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const singUpWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider)
    return user
}
export default singUpWithGoogle
