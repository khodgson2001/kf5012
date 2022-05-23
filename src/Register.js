import React from 'react';

//Form used with express and MySQL database to submit a new user to the database. Cannot be an admin, always a customer account created.
function Register() {
    return(
        <div className = 'register'>
            <form action='http://localhost:9999/register' method='POST'>
                <div className='loginForm'>
                    <h2>Register account</h2>
                    <div className='loginFormInner'>
                        <label htmlFor = "fName">First Name: </label>
                        <input type = "text" id = "fName" name = "fName" maxLength = "44" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "lName">Last Name: </label>
                        <input type = "text" id = "lName" name = "lName" maxLength = "44" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "email">Email: </label>
                        <input type = "email" id = "email" name = "email" maxLength = "44" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "pwrd">Password: </label>
                        <input type = "password" id = "pwrd" name = "pwrd" required maxLength = "44"></input>
                    </div>
                    <div className='loginFormButton'>
                        <input type = "submit" value = "Register"></input>
                    </div>
                </div>
            </form> 
        </div>
    );
}

export default Register;