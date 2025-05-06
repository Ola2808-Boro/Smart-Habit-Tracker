import './PageTitle.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
    const location=useLocation();
    const titles = {
        '/main-page': 'Dashboard',
        '/habits': 'Habits',
        '/statistics': 'Statistics',
        '/profile': 'Profile',
        '/notes': 'Notes',
        '/sign-up': 'Sign Up',
        '/': 'Login',
      };
    const title = titles[location.pathname] || 'Smart Habit Tracker';
    return(
       <h1 className='page-title'>{title}</h1>
    )

}

export default PageTitle;