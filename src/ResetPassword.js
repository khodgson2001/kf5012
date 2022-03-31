import React from 'react';

function ResetPassword() {
    return(
        <div className = 'resetPassword'>
            <form>
                <div className='loginForm'>
                    <h2>Reset password</h2>
                    <div className='loginFormInner'>
                        <label htmlFor = "email">Email: </label>
                        <input type = "email" id = "email" maxLength = "50" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "password">Current password: </label>
                        <input type = "password" id = "password" maxLength = "50" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "passwordNew">New password: </label>
                        <input type = "password" id = "passwordNew" required></input>
                    </div>
                    <div className='loginFormInner'>
                        <label htmlFor = "passwordNewConf">Confirm password: </label>
                        <input type = "password" id = "passwordNewConf" required></input>
                    </div>
                    <div className='loginFormButton'>
                        <input type = "submit" value = "Submit"></input>
                    </div>
                </div>
            </form> 
        </div>
    );
}

export default ResetPassword;