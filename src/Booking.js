import React from 'react';
import {useEffect, useState} from 'react';




function Booking() {

    const [barbers, setBarbers] = useState(null);

    
    useEffect(() => {
        fetch('http://localhost:9999/staff')
            .then(res => {
               return res.json();
            })
            .then(data => {
                setBarbers(data);
                console.log(data);
                todaysDate();
            });
    }, []);
    
    const currentDate = new Date();

    const [date, setDate] = useState();

    function todaysDate() {
        setDate(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    }


    return (
        <div className='booking'>
            <div className='bookingForm'>
                <form action = "http://localhost:9999/staffAvailability" method = "POST">
                    <label htmlFor = "barbers">Select a barber: </label>
                        <select name = "barbers" id = "barbers">
                            {barbers && barbers.map((barber) => (
                                <option value = {barber.staffID} key = {barber.staffID}>{barber.fName} {barber.sName}</option>
                            ))}
                        </select>
                    <label htmlFor = "dates">Select a date: </label>
                        <input type = "date" min = {date}></input>
                    <input type = "submit" value = "submit"></input>
                </form>
            </div>
        </div>
    );
}

export default Booking;