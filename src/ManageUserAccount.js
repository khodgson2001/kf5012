import {useEffect, useState} from 'react';
//IMporting the cookies
import { useCookies } from "react-cookie";
//Importing the Link, that links with the routes from the home page, from the router dom
import { Link } from 'react-router-dom';

function ManageUserAccount () {

    //Getting cookies
    const [cookies, setCookie] = useCookies();

    //const holding JSON dats for appointments
    const [appointments, getAppointments] = useState(null);

    //Fetching JSON data upon first render
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
                        <input name = "fName" id = "fName" type = "text" required maxLength="44"></input>
                    </div>
                    <div className = "manageAccountFormInner">
                        <label htmlFor = "sName">Your last name: </label>
                        <input name = "sName" id = "sName" type = "text" required maxLength="44"></input> 
                    </div>
                    <div className = "manageAccountFormInner">
                        <input value = "Submit" type = "submit" id = "submit"></input> 
                    </div>
                </form>
                <div className='loginReset'>
                        <Link to='/ResetPassword'>Reset Password</Link>
                </div>
                <p className='textAlign'>To cancel your booking, contact Jon Doe: JonDoe26@email.com</p>
            </div>
        </div>
    );
}

export default ManageUserAccount;