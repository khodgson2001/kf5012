import React from 'react';
import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";




function Booking() {

    const [cookies, setCookie] = useCookies();

    const [barbers, setBarbers] = useState(null);

    const [cuts, setCuts] = useState(null);
    
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
    }, []);
    



    return (
        <div className='booking'>
            <div className='bookingForm'>
                <form action = "http://localhost:9999/staffAvailability" method = "POST">
                    <input type = "hidden" id = "customerID" value = {cookies.username}></input>
                    <label htmlFor = "barbers">Select a barber: </label>
                        <select name = "barbers" id = "barbers">
                            {barbers && barbers.map((barber) => (
                                <option value = {barber.staffID} key = {barber.staffID}>{barber.fName} {barber.sName}</option>
                            ))}
                        </select>
                    <label htmlFor = "dates">Select a date: </label>
                        <input type = "date" id="date"></input>
                </form>
            </div>
        </div>
    );
}

export default Booking;