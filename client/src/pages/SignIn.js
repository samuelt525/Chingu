import { FirebaseError } from 'firebase/app'
import React from 'react'

import 'firebase/auth';
import firebaseConfig from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import * as firebase from 'firebase/app';

const provider = new GoogleAuthProvider();
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

function SignIn() {
    return (
        <button onClick={googleSignInRedirect.bind(this)}>Sign in with Google</button>
    )
}

function googleSignInRedirect() {
    return (
        signInWithRedirect(auth, provider)
    )
}

export default SignIn