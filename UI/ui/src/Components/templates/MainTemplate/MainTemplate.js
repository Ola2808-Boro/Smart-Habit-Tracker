import './MainTemplate.css';
import React from 'react';
import Navbar from '../../organisms/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainTemplate = () => {


    return (
        <div className='main-page-container'>
            <Navbar />
            <div className='main-page-content'>
                <Outlet/>
            </div>
            
        </div>
    );
};

export default MainTemplate;
