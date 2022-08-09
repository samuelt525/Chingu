import './App.css';
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Messages from './pages/Messages';
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
      localStorage.setItem('userSignedIn', '1')
    }
    else {
      localStorage.removeItem('userSignedIn')
    }
  });
  if (!localStorage.getItem('userSignedIn') == '1') {
    console.log('hello!?!"');
    return (
      <SignIn />
    )
  }
  else {
    return (
      mainPage()
    )
  }
}

function mainPage() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" />
          <Route path="/Messages" component={Messages} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
