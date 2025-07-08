import { useLocation } from "react-router-dom";
import { Title } from "./PageTitle.styles";
// PageTitle component returns a title based on the current URL path
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
  // Match the pathname with title or show default
  const title = titles[location.pathname] || "Smart Habit Tracker";
  return <Title>{title}</Title>;
};

export default PageTitle;
