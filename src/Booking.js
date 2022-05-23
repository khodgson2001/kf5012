import React from 'react';
import {useEffect, useState} from 'react';
import { useCookies } from "react-cookie";




function Booking() {

    /*constant that holds the cookies that stores the information about the current user e.g. username etc*/
    const [cookies, setCookie] = useCookies();

    /*constant that holds the JSON data that is fetched in the use effect */
    const [barbers, setBarbers] = useState(null);

    /*constant that holds the JSON data that is fetched in the use effect  */
    const [cuts, setCuts] = useState(null);
    
    /*Use effect runs when the page is rendered. The empty array specifies that the useEffect dependencies. As it is empty it only runs on the initial load of the page */
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
    

    /*Here, a form is generated to the user to be able to create a booking. It communitcates with the /book route with express to input to the mySQL database. 
    The .map function takes in the JSON data stored in barbers variable and loops through it. In the JSX, the barber. notation allows access to elements within the JSON data.
    This is the same for the cuts.
    */
    return (
        <div className='booking'>
            <div className='bookingForm'>
                <form action = "http://localhost:9999/book" method = "POST">
                    <div className='bookingInner'>
                    <input name = "customerID" type = "hidden" id = "customerID" value = {cookies.username}></input>
                    <label htmlFor = "barbers">Select a barber: </label>
                        <select name = "barbers" id = "barbers" required>
                            {barbers && barbers.map((barber) => (
                                <option value = {barber.staffID} key = {barber.staffID}>{barber.fName} {barber.sName}</option>
                            ))}
                        </select>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "dates">Select a date: </label>
                        <input name = "date" type = "date" id="date" required></input>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "times">Select a time: </label>
                        <input name = "time" type = "time" id="time" required></input>
                    </div>
                    <div className='bookingInner'>
                    <label htmlFor = "cuts">Select a cut: </label>
                        <select name = "hairCuts" id = "hairCuts" required>
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