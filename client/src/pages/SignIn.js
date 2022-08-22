import { FirebaseError } from 'firebase/app'
import React, { useState } from 'react';
import {
    Button
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import './SignIn.css';
import ChingLogo from '../Ching-logos/Ching-logos_black_cropped.png'
import 'firebase/auth';
import { firebaseConfig } from '../firebase';
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

    function renderHtml() {
        return (
            setHtml(<SignUp />)
        )
    }
    function signInButtons() {
        return (
            <>
                <div className='signInContainer'>
                    <div className='imageContainer'>
                        <img src={ChingLogo} height={250} width={600} />
                    </div>
                    <h1 className='signInText'>Sign in to Ching!</h1>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    <br></br>
                    <p className='text'>————— Don't have an account? —————</p>
                    <br></br>
                    <div className="signUpButton">
                        <Button variant="outlined" startIcon={<MailIcon />} onClick={renderHtml}>Sign up with email</Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {html}
        </>
    )
}

export default SignIn