import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

export default function App() {
  return (
  
    <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
