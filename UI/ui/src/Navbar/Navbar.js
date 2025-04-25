import './Navbar.css';
import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartSimple,faListCheck,faNoteSticky,faRightFromBracket,faUser} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return(
       <div className='navbar-card'>
            <div>
                <h2 className='navbar-card-title'>Smart Habit Tracker</h2>
            </div>
            <div className='navbar-card-option'>
                <FontAwesomeIcon icon={faChartSimple} />
                <Link to="/statistics" style={{ marginLeft:"8px", textDecoration: 'none',color:"black" }}>Statistics</Link>
            </div>
            <div className='navbar-card-option'>
                <FontAwesomeIcon icon={faNoteSticky} />
                <Link to="/notes" style={{marginLeft:"8px", textDecoration: 'none',color:"black" }}>Notes</Link>
            </div>
            <div className='navbar-card-option'>
                <FontAwesomeIcon icon={faListCheck} />
                <Link to="/habits" style={{marginLeft:"8px", textDecoration: 'none',color:"black" }}>Habits</Link>
            </div>
            <div className='navbar-card-option'>
                <FontAwesomeIcon icon={faUser} />
                <Link to="/profile" style={{marginLeft:"8px", textDecoration: 'none',color:"black" }}>Profile</Link>
            </div>
            <div className='navbar-card-option'>
                <FontAwesomeIcon icon={faRightFromBracket} />
                <Link to="/log-out" style={{marginLeft:"8px", textDecoration: 'none',color:"black" }}>Log out</Link>
            </div>
       </div>
    )

}

export default Navbar;