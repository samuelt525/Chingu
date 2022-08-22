import React, { useState } from 'react';

import {
    Button
} from '@mui/material';

import { firebaseConfig } from './firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { updateDoc, setDoc, doc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ChingLogo from './Ching-logos/Ching-logos_black_cropped.png'
import { TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Avatar } from "@mui/material"
import './styles/InitialProfileSetup.css';
import App from './App';
import ImageUploading from "react-images-uploading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { db, auth, storage } from './firebase.js'
import { useCollection } from 'react-firebase-hooks/firestore';

function InitialProfileSetup() {
    const app = firebase.initializeApp(firebaseConfig);
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
        bio: "",
        profilePic: ""
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formValues.name == "") {
            setErrorMessage("Please enter your name.");
        }
        else if (formValues.birthday == "") {
            setErrorMessage("Please enter your birthday.")
        }
        else {
            try {
                await setDoc(doc(db, 'profile', uid), {
                    name: formValues.name,
                    birthday: formValues.birthday,
                    bio: formValues.bio,
                    userID: uid,
                    email: auth.currentUser.email,
                    friends: []
                }, { merge: true });
                sessionStorage.setItem('profileSetUp', '1');
                window.location.reload(false);
            }
            catch (e) {
                console.log("Error adding document: " + e);
            }
        }
    };
    const [error, setError] = useState("");
    function setErrorMessage(errorMessage) {
        return (
            setError(errorMessage)
        )
    }

    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const uploadProfilePic = async (event) => {
        event.preventDefault();
        const profilePicsRef = ref(storage, uid + '-profile-pic');
        uploadBytes(profilePicsRef, images[0].file).then((snapshot) => {
            console.log('Uploaded a Picture successfully!');
        });
        getDownloadURL(profilePicsRef).then(async (url) => {
            const updateRef = doc(db, 'profile', uid);
            await setDoc(updateRef, {
                profilePic: url
            });
        });
    }

    const [value, setValue] = React.useState(null);
    return (
        <>
            <div className="initialProfileSetupContainer">
                <div className='imageContainer'>
                    <img src={ChingLogo} height={250} width={600} />
                </div>
                <h1 className='welcome'>Welcome to Ching!</h1>
                <h2 className='directions'>Enter your information below:</h2>
                <div className='formContainer'>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Enter your name"
                            type="text"
                            fullWidth
                            margin='normal'
                            value={formValues.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            id="bio-input"
                            name="bio"
                            label="Enter a bio"
                            type="text"
                            fullWidth
                            margin='normal'
                            value={formValues.bio}
                            onChange={handleInputChange}
                        />
                        <br />
                        <br />
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                id="birthday-input"
                                label="Enter your birthday"
                                name="birthday"
                                value={value}
                                fullWidth
                                margin='normal'
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    formValues.birthday = String(newValue._d).substring(4, 15);
                                    console.log(formValues.birthday);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <br />
                        <br />
                        <ImageUploading
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                            acceptType={["jpg", "png"]}
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps
                            }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <Button startIcon={<InsertPhotoIcon />} variant='outlined' style={isDragging ? { color: "red" } : null}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Click or Drop profile picture here</Button>
                                    &nbsp;
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image.data_url} alt="" width="100" />
                                            <div className="image-item__btn-wrapper">
                                                <Button variant='outlined' onClick={uploadProfilePic}>Update profile picture</Button>
                                                <Button variant='outlined' onClick={() => onImageRemove(index)}>Remove</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
                {error}
            </div>
        </>
    )
}

export default InitialProfileSetup