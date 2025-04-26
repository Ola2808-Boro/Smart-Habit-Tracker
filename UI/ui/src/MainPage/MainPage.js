import './MainPage.css';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const MainPage = () => {


    return (
        <div className='main-page-container'>
            <Navbar />
            <div>
                <Outlet/>
            </div>
            
        </div>
    );
};

export default MainPage;
