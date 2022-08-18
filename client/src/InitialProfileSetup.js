import React, { useState } from 'react';

import {
    Button
} from '@mui/material';

import {firebaseConfig} from './firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers';

function InitialProfileSetup() {
    const app = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    var uid = "";

    onAuthStateChanged(auth, (user) => {
        if (user) {
          uid = user.uid;
        }
        else {
          console.log("This shouldn't occur");
        }
      });

    const defaultValues = {
        name: "",
        birthday: "",
        profilePic: "",
        bio: ""
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
        if (formValues.name == "") {
            setErrorMessage("Please enter your name.");
        }
        else if (formValues.birthday == "") {
            setErrorMessage("Please enter your birthday.")
        }
        else {
            try {
                const profileRef = setDoc(doc(db, 'profile', uid), {
                    name: formValues.name,
                    birthday: formValues.birthday,
                    bio: formValues.bio
                });
            }
            catch (e) {
                console.log("Error adding document: " + e);
            }
            finally {
                sessionStorage.setItem('profileSetUp', '1');
                window.location.reload(true);
            }
        }
    };
    const [error, setError] = useState("");
    function setErrorMessage(errorMessage) {
        return (
            setError(errorMessage)
        )
    }
    const [value, setValue] = React.useState(null);
    return (
        <>
            <h1>Welcome to Ching!</h1>
            <h2>Enter your information below:</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="name-input"
                    name="name"
                    label="Enter your name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        id="birthday-input"
                        label="Enter your birthday"
                        name="birthday"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            formValues.birthday = String(newValue._d).substring(4, 15);
                            console.log(formValues.birthday);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    id="bio-input"
                    name="bio"
                    label="Enter a bio"
                    type="text"
                    value={formValues.bio}
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

export default InitialProfileSetup