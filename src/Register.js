import React from 'react';

function Register() {
    return(
        <div className = 'register'>
            <form action='http://localhost:9999/register' method='POST'>
                <div className='loginForm'>
                    <h2>Register account</h2>
                    <div className='loginFormInner'>
                        <label htmlFor = "fName">First Name: </label>
                        <input type = "text" id = "fName" name = "fName" maxLength = "50" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "lName">Last Name: </label>
                        <input type = "text" id = "lName" name = "lName" maxLength = "50" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "email">Email: </label>
                        <input type = "email" id = "email" name = "email" maxLength = "50" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "pwrd">Password: </label>
                        <input type = "password" id = "pwrd" name = "pwrd" required></input>
                    </div>
                    <div className='loginFormButton'>
                        <input type = "submit" value = "Log In"></input>
                    </div>
                </div>
            </form> 
        </div>
    );
}

export default Register;