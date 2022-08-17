import React, { useState } from 'react';

import {
    Button
} from '@mui/material';

import 'firebase/auth';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { TextField } from '@mui/material';

const provider = new GoogleAuthProvider();
const auth = getAuth();

// const uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: '/',
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ]
// };

function SignUp() {
    const defaultValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                window.location.reload(false);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
                // ..
            });
    };
    const [error, setError] = useState("");
    function setErrorMessage(errorMessage) {
        return (
            setError(errorMessage)
        )
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="email-input"
                    name="email"
                    label="Email"
                    type="text"
                    value={formValues.email}
                    onChange={handleInputChange}
                />
                <TextField
                    id="password-input"
                    name="password"
                    label="Password"
                    type="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
            {error}
        </>
    )
}

export default SignUp