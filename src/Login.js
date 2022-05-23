import React from 'react';
import { Link } from 'react-router-dom';



function Login() {
    return(    
        <><div className='login'>
            <form action="http://localhost:9999/auth" method="POST">
                <div className='loginForm'>
                    <h2>Login</h2>
                    <div className='loginFormInner'>
                        <label htmlFor="email">Email: </label>
                        <input type="email" id="email" maxLength="45" name="email" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor="pwrd">Password: </label>
                        <input type="password" id="pwrd" name="pwrd" maxLength = "44" required></input>
                    </div>
                    <div className='loginFormButton'>
                        <input type="submit" value="Log In"></input>
                    </div>
                </div>
            </form>
        </div><div className='register'>
                <form action='http://localhost:9999/register' method='POST'>
                    <div className='loginForm'>
                        <h2>Register account</h2>
                        <div className='loginFormInner'>
                            <label htmlFor="fName">First Name: </label>
                            <input type="text" id="fName" name="fName" maxLength="44" required></input>
                        </div>
                        <div className='loginFormInner'>
                            <label htmlFor="lName">Last Name: </label>
                            <input type="text" id="lName" name="lName" maxLength="44" required></input>
                        </div>
                        <div className='loginFormInner'>
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="emailReg" name="emailReg" maxLength="44" required></input>
                        </div>
                        <div className='loginFormInner'>
                            <label htmlFor="pwrd">Password: </label>
                            <input type="password" id="pwrdReg" name="pwrdReg" required></input>
                        </div>
                        <div className='loginFormButton'>
                            <input type="submit" value="Log In"></input>
                        </div>
                    </div>
                </form>
            </div></>
    );
}

export default Login;