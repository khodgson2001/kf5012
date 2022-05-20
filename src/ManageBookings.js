import React from "react";
import {useEffect, useState} from 'react';

    

function ManageBookings () {

    const [barbers, setBarbers] = useState(null);

    const [cuts, setCuts] = useState(null);

    const [customer, setCustomer] = useState(null);

    const [appointments, getAppointments] = useState(null);

    
    useEffect(() => {
        fetch('http://localhost:9999/staff')
            .then(res => {
               return res.json();
            })
            .then(data => {
                setBarbers(data);
                console.log(data);
            });
        fetch('http://localhost:9999/cuts')
            .then(res => {
               return res.json();
             })
            .then(data => {
                setCuts(data);
                console.log(data);

            })
        fetch('http://localhost:9999/getCustomers')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCustomer(data);
                console.log(data);
            })
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
        <div className="manageBookings">
            <h2>Current Bookings</h2>
            {appointments && appointments.map((appointment) => (
                <div className="appointments"  key = {appointment.appointmentID}>
                    <p>Appointment ID: {appointment.appointmentID}</p>
                    <p>Customer ID:{appointment.customers_customerID}</p>
                    <p>Cut ID: {appointment.cuts_cutID}</p>
                    <p>Date:{appointment.date}</p>
                    <p>Staff ID: {appointment.staff_staffID}</p>
                    <p>Time: {appointment.time}</p>
                </div>
            ))}
            <h2>Cancel Bookings</h2>
            <div className="deleteBookingForm">
                <form action = "http://localhost:9999/deleteBooking" method = "POST">
                        <div className="innerDeleteForm">
                        <label htmlFor = "bookingID">Booking ID to be deleted: </label>
                        <input type = "text" name = "bookingID" id = "bookingID"></input>
                        <input type = "submit" id = "submit" value = "Delete"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManageBookings;