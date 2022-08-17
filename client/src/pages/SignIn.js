import { FirebaseError } from 'firebase/app'
import React, { useState } from 'react';
import {
    Button
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import './SignIn.css';

import 'firebase/auth';
import firebaseConfig from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import SignUp from './SignUp.js'

const provider = new GoogleAuthProvider();
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth();

//var firebase = require('firebase/compat/app');

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

function SignIn() {
    const [html, setHtml] = useState(signInButtons);

    function renderHtml () {
        return(
            setHtml(<SignUp />)
        )
    }
    function signInButtons() {
        return (
            <>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                <br></br>
                <p>————— Don't have an account? —————</p>
                <br></br>
                <div className="signUpButton">
                    <Button variant="outlined" startIcon={<MailIcon />} onClick={renderHtml}>Sign up with email</Button>
                </div>
    
                {/* <Routes>
                    <Route path="/SignUp" element={<SignUp />}>
    
                    </Route>
                </Routes> */}
            </>
        )
    }
    
    return (
        <>
            {html}
        </>
    )
}

// function googleSignInRedirect() {
//     return (
//         signInWithRedirect(auth, provider)
//     )
// }

// function emailSignIn() {
//     console.log("FUIFDJLSF");
// }

export default SignIn