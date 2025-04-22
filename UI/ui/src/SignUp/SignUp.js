import './SignUp.css';
import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from "axios"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    async function handleSignUp(e){
        e.preventDefault();
        const requestBody = {email, password,firstName, lastName}
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
        <div className='sign-up-card'>
            <h1 className='sign-up-headline'>Habit Tracker</h1>
            <form className='sign-up-form' onSubmit={handleSignUp}>
                <div className='sign-up-input-conatiner'>
                    <label className='label'>Enter address:</label>
                    <input value={email} className='input' type="email" onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className='sign-up-input-conatiner'>
                    <label className='label'>Enter first name:</label>
                    <input value={firstName} className='input' type="text" onChange={e=>setFirstName(e.target.value)}/>
                </div>
                <div className='sign-up-input-conatiner'>
                    <label className='label'>Enter last name:</label>
                    <input value={lastName} className='input' type="text" onChange={e=>setLastName(e.target.value)}/>
                </div>
                <div className='sign-up-input-conatiner'>
                    <label className='label'>Password:</label>
                    <input value={password} className='input' type="password"  onChange={e=>setPassword(e.target.value)}/>
                </div>
                <button className='sign-up-button' type='submit'>Log In</button>
                {/* <p className='login-p'>Don't have an account? 
                    <Link to='/sign-up' className='login-sign-up-link'>
                    Sign up
                    </Link>
                </p> */}
            </form>
        </div>
    )

}

export default SignUp;