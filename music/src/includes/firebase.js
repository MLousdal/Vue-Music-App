// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZqoHvbBhJpIgbmVA4LiQXmw86nrTJApU',
  authDomain: 'music-ca67e.firebaseapp.com',
  projectId: 'music-ca67e',
  storageBucket: 'music-ca67e.appspot.com',
  messagingSenderId: '8501425587',
  appId: '1:8501425587:web:b248f6f8b94f96d2ce87c6',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
