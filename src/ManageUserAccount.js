import {useEffect, useState} from 'react';
//IMporting the cookies
import { useCookies } from "react-cookie";
//Importing the Link, that links with the routes from the home page, from the router dom
import { Link } from 'react-router-dom';



function ManageUserAccount () {

    //Payment stuff

    


    
    //Getting cookies
    const [cookies, setCookie] = useCookies();

    //const holding JSON dats for appointments
    const [appointments, getAppointments] = useState(null);


    //Fetching JSON data upon first render
    useEffect(() => {
        fetch('http://localhost:9999/getAppointments/'+cookies.username)
            .then(res => {
                return res.json();
            })
            .then(data => {
                getAppointments(data);
            })
    }, []);


   let price;

   let appoint;

   let cutname;


   

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
            <div className='bookingInnerSubmit'>
                <h2>My Current Bookings</h2>
                {appointments && appointments.map((appointment) => (
                <div className="appointments"  key = {appointment.appointmentID}>
                    <p>Appointment ID: {appointment.appointmentID}</p>
                    <p>Date:{appointment.date.substring(0,10)}</p>
                    <p>Time start: {appointment.time}</p>
                    <p>Time end: {appointment.time_end}</p>
                    <p>Barber: {appointment.fName} {appointment.sName}</p>
                    <p>Cut type: {appointment.name}</p>
                    <p>Paid: {appointment.paid}</p>
                    <p>Cost: £{appointment.cost}</p>
                    <div className='paymentButtons'>
                    <Link to="/Payment" state={[appointment.cost + ';' + appointment.appointmentID + ';' + appointment.name]}>Pay Now</Link>
                    </div>

                    
                </div>
                ))}
            </div>
        </div>
    );
}

export default ManageUserAccount;