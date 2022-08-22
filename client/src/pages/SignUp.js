import React, { useState } from 'react';

import {
    Button
} from '@mui/material';
import ChingLogo from '../Ching-logos/Ching-logos_black_cropped.png'
import 'firebase/auth';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { TextField } from '@mui/material';
import '../styles/SignUp.css'
import AccountCircle from '@mui/icons-material/AccountCircle';
import SignIn from './SignIn.js'

const provider = new GoogleAuthProvider();
const auth = getAuth();

function SignUp() {
    const defaultValues = {
        email: "",
        password: "",
        passwordCheck: ""
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
        if (formValues.password != formValues.passwordCheck) {
            setErrorMessage("Passwords do not match");
        }
        else {
            createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    sessionStorage.setItem('profileSetUp', '0');
                    window.location.reload(true);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                    // ..
                });
        }
    };
    const [error, setError] = useState("");
    function setErrorMessage(errorMessage) {
        return (
            setError(errorMessage)
        )
    }
    function renderHtml() {
        window.location.reload(true);
    }

    return (
        <>
            <div className="signUpContainer">
                <div className='imageContainer'>
                    <img src={ChingLogo} height={250} width={600} />
                </div>
                <h1 className='signUpText'>Sign Up for Ching</h1>
                <form onSubmit={handleSubmit} className='signUpForm'>
                    <TextField
                        id="email-input"
                        name="email"
                        label="Enter Email"
                        type="text"
                        fullWidth
                        margin='normal'
                        value={formValues.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="password-input"
                        name="password"
                        label="Enter Password"
                        type="password"
                        fullWidth
                        margin='normal'
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="password-input-check"
                        name="passwordCheck"
                        label="Enter Password Again"
                        type="password"
                        fullWidth
                        margin='normal'
                        value={formValues.passwordCheck}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
                {error}
                <br></br><br></br>
                <p className='text'>————— Already have an account? —————</p>
                <br></br>
                <div className="signInButton">
                    <Button variant="outlined" startIcon={<AccountCircle />} onClick={renderHtml}>Sign in here!</Button>
                </div>
            </div>
        </>
    )

}

export default SignUp