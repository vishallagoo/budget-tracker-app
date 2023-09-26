import firebase from 'firebase/compat/app'
import {getAuth} from 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmuUo8w65eLTbWZvDTpPlkCW5jzmO-gos",
    authDomain: "budget-tracker-13c73.firebaseapp.com",
    projectId: "budget-tracker-13c73",
    storageBucket: "budget-tracker-13c73.appspot.com",
    messagingSenderId: "428716115203",
    appId: "1:428716115203:web:4f485dee3365ce62f91536",
    measurementId: "G-PZQT2HS67S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {auth}