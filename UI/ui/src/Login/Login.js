import './Login.css';
import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogIn(e){
        e.preventDefault();
        const requestBody = {email, password}
        console.log('You clicked submit.')
        console.log(requestBody)
        const response = await axios.post('http://127.0.0.1:5000/login', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(`response: ${response}`)
    }
    return(
        <div className='login-card'>
            <h1 className='login-headline'>Habit Tracker</h1>
            <form className='login-form' onSubmit={handleLogIn}>
                <div className='login-input-conatiner'>
                    <label className='label'>Enter address:</label>
                    <input value={email} className='input' type="email" onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className='login-input-conatiner'>
                    <label className='label'>Password:</label>
                    <input value={password} className='input' type="password"  onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button className='login-button' type='submit'>Log In</button>
                <p className='login-p'>Don't have an account? 
                    <Link to='/sign-up' className='login-sign-up-link'>
                    Sign up
                    </Link>
                </p>
            </form>
        </div>
    )

}

export default Login;