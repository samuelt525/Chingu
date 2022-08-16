import './App.css';
import SignIn from './pages/SignIn';
import firebaseConfig from './firebase';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    console.log('hello!?!"');
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
