import React from "react";
import { useLocation } from "react-router-dom";
import { Title } from "./PageTitle.styles";

const PageTitle = () => {
  const location = useLocation();
  const titles = {
    "/main-page": "Dashboard",
    "/habits": "Habits",
    "/statistics": "Statistics",
    "/profile": "Profile",
    "/notes": "Notes",
    "/sign-up": "Sign Up",
    "/": "Login",
    "/mood": "Mood",
  };
  const title = titles[location.pathname] || "Smart Habit Tracker";
  return <Title>{title}</Title>;
};

export default PageTitle;
