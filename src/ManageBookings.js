import React from "react";
import {useEffect, useState} from 'react';

    

function ManageBookings () {

    //Constant that holds the JSON data for the appointments
    const [appointments, getAppointments] = useState(null);

    //Use effect that assigns the JSON data from the API endpoint to the appointments useState variable
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


    /*Displays the JSON data for appointments in a neat way. Also the substring just removes the time from the appointment.date
    Also the form to delete the bookings takes in the ID and deletes it based off that    
    */
    return (
        <div className="manageBookings">
            <h2>Current Bookings</h2>
            {appointments && appointments.map((appointment) => (
                <div className="appointments"  key = {appointment.appointmentID}>
                    <p>Appointment ID: {appointment.appointmentID}</p>
                    <p>Customer ID:{appointment.customers_customerID}</p>
                    <p>Cut ID: {appointment.cuts_cutID}</p>
                    <p>Date:{appointment.date.substring(0,10)}</p>
                    <p>Staff ID: {appointment.staff_staffID}</p>
                    <p>Time: {appointment.time}</p>
                </div>
            ))}
            <h2>Cancel Bookings</h2>
            <div className="deleteBookingForm">
                <form action = "http://localhost:9999/deleteBooking" method = "POST">
                        <div className="innerDeleteForm">
                        <label htmlFor = "bookingID">Booking ID to be deleted: </label>
                        <input type = "number" name = "bookingID" id = "bookingID" required></input>
                        <input type = "submit" id = "submit" value = "Delete"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManageBookings;