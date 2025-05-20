import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import MainPage from './MainPage/MainPage';
import Habits from './Habits/Habits';
import Statistics from './Statistics/Statistics';
import Notes from './Notes/Notes';
import Profile from './Profile/Profile';
import Dashboard from './Dashboard/Dashboard';
import Mood from './Mood/Mood';

export default function App() {
  return (
  
    <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<MainPage />}>
          <Route path="main-page" element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="notes" element={<Notes />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mood" element={<Mood />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
