import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import MainPage from './MainPage/MainPage';

export default function App() {
  return (
  
    <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
