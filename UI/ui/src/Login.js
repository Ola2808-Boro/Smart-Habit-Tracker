import './Login.css';

function Login(){

    return(
        <div className='login-card'>
            <h1 className='login-headline'>Habit Tracker</h1>
            <form className='login-form'>
                <label className='label'>Enter address:</label>
                <input className='input' type="email" />
                <label className='label'>Password:</label>
                <input className='input' type="password" />
                <button className='login-button'>Log In</button>
                <p className='login-p'>Don't have an account? 
                    <a href='#' className='login-sign-up-link'>
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    )

}

export default Login;