import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';

function ManageUserAccount () {

    const [cookies, setCookie] = useCookies();

    const [appointments, getAppointments] = useState(null);

    useEffect(() => {
        fetch('http://localhost:9999/getAppointments')
            .then(res => {
                return res.json();
            })
            .then(data => {
                getAppointments(data);
                console.log(data);
            })
    }, []);

    

    return (
        <div className="manageUserAccount">
            <h2>Manage Account</h2>
            <div className="manageAccountForm">
                <form action = 'http://localhost:9999/manageUser' method = "POST">
                    <div className = "manageAccountFormInner">
                        <label htmlFor = "username">Your Username: </label>
                        <input name = "username" id = "username" type = "email" readOnly defaultValue = {cookies.username}></input>
                    </div>
                    <div className = "manageAccountFormInner">
                        <label htmlFor = "sName">Your first name: </label>
                        <input name = "fName" id = "fName" type = "text"></input>
                    </div>
                    <div className = "manageAccountFormInner">
                        <label htmlFor = "sName">Your last name: </label>
                        <input name = "sName" id = "sName" type = "text"></input> 
                    </div>
                    <div className = "manageAccountFormInner">
                        <input value = "Submit" type = "submit" id = "submit"></input> 
                    </div>
                </form>
                <div className='loginReset'>
                        <Link to='/ResetPassword'>Reset Password</Link>
                </div>
                <p>To cancel your booking, contact Jon Doe: JonDoe26@email.com</p>
            </div>
        </div>
    );
}

export default ManageUserAccount;