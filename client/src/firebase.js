import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB5FCzbgcKs0T7qPQoGCc1dk8nqMvyEGkM",
    authDomain: "ching-b2cb5.firebaseapp.com",
    projectId: "ching-b2cb5",
    storageBucket: "ching-b2cb5.appspot.com",
    messagingSenderId: "813233236645",
    appId: "1:813233236645:web:d4164bec0e055f036a3b4c",
    measurementId: "G-3YKB8ESGT5"
  };


//const auth = firebase.auth();
//const firestore = firebase.firestore();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


export {firebaseConfig, auth, db, storage};