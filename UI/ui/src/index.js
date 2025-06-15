import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Login from "./Components/pages/Login/Login";
import SignUp from "./Components/pages/SignUp/SignUp";
import MainTemplate from "./Components/templates/MainTemplate/MainTemplate";
import Habits from "./Components/pages/Habits/Habits";
import Statistics from "./Components/pages/Statistics/Statistics";
import Notes from "./Components/pages/Notes/Notes";
import Profile from "./Components/pages/Profile/Profile";
import Dashboard from "./Components/pages/Dashboard/Dashboard";
import Mood from "./Components/pages/Mood/Mood";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<MainTemplate />}>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
