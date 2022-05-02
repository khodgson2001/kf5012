import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <div className = 'login'>
            <form action="http://localhost:9999/auth" method="POST">
                <div className='loginForm'>
                    <h2>Login</h2>
                    <div className='loginFormInner'>
                        <label htmlFor = "email">Email: </label>
                        <input type = "email" id = "email" maxLength = "50" name="email" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "pwrd">Password: </label>
                        <input type = "password" id = "pwrd" name = "pwrd" required></input>
                    </div>
                    <div className='loginFormButton'>
                        <input type = "submit" value = "Log In"></input>
                    </div>
                    <div className = 'loginReset'>
                        <Link to = '/ResetPassword'>Reset Password</Link>
                    </div>
                </div>
            </form> 
            <div className='noLogin'>
                <h3>Not got an account?</h3>
                <h4>Create one here:</h4>
                <Link to = '/Register'>Register account</Link>
            </div>
        </div>
    );
}

export default Login;