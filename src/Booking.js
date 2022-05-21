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
                <form action = "http://localhost:9999/book" method = "POST">
                    <div className='bookingInner'>
                    <input name = "customerID" type = "hidden" id = "customerID" value = {cookies.username}></input>
                    <label htmlFor = "barbers">Select a barber: </label>
                        <select name = "barbers" id = "barbers">
                            {barbers && barbers.map((barber) => (
                                <option value = {barber.staffID} key = {barber.staffID}>{barber.fName} {barber.sName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "dates">Select a date: </label>
                        <input name = "date" type = "date" id="date"></input>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "times">Select a time: </label>
                        <input name = "time" type = "time" id="time"></input>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "cuts">Select a cut: </label>
                        <select name = "hairCuts" id = "hairCuts">
                            {cuts && cuts.map((cut) => (
                                <option value = {cut.cutID} key = {cut.cutID} disabled = {(cut.available == 0) ? true : false}>{cut.name} - £{cut.cost}</option>
                            ))}
                        </select>
                    </div>
                    <div className='bookingInnerSubmit'>
                        <input type = "submit" value = "Confirm Booking"></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Booking;