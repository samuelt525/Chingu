import './App.css';
import firebaseConfig from './firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignIn from './pages/SignIn';

function App() {
  const app = firebase.initializeApp(firebaseConfig);
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      sessionStorage.setItem('userSignedIn', '1')
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
    console.log("hi")
    return (
      mainPage()
    )
  }
}

function mainPage() {
  return (
    <h1>
      Hello
    </h1>
  )
}

export default App;
