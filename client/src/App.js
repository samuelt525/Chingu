import './App.css';
import Sidebar from './components/Sidebar'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Messages from './pages/Messages';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/"/>
          <Route path="/Messages" component={Messages} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
