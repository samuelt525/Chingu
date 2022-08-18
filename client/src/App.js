import './App.css';
import {firebaseConfig} from './firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignIn from './pages/SignIn';
import InitialProfileSetup from './InitialProfileSetup';

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function App() {
  var uid = "";
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      sessionStorage.setItem('userSignedIn', '1');
      uid = user.uid;
      docExists('profile', uid);
    }
    else {
      sessionStorage.removeItem('userSignedIn')
    }
  });
  if (sessionStorage.getItem('userSignedIn') != '1') {
    return (
      <SignIn />
      
    )
  }
  else {
    if (sessionStorage.getItem('profileSetUp') == '0') {
      return (
        <InitialProfileSetup />
      )
    }
    else {
      console.log("hi")
      return (
        mainPage()
      )
    }
  }
}

function mainPage() {
  return (
    <h1>
      Hello
    </h1>
  )
}

async function docExists(docName, docId) {
  let docSnapshot = await getDoc(doc(db, docName, docId));
  console.log(docSnapshot._document);
  if(docSnapshot._document == null) {
    sessionStorage.setItem('profileSetUp', '0');
  }
}

export default App;
