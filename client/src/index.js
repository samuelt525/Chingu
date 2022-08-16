import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App';
import Messages from './pages/Messages'
import Profile from './pages/Profile'

import reportWebVitals from './reportWebVitals';

import NewSidebar from './components/NewSideBar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <NewSidebar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="messages" element={<Messages />} />
      <Route path="profile" element={<Profile />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
