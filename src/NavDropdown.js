import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";


function NavDropdown() {

    const [cookies, setCookie] = useCookies();

    function loggedOutUser(){
        return (
            <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/Login'>Login</Link>
            <Link to = '/Logout'>Logout</Link>
        </div>
        );
    }

    function customerUser(){
        return(
            <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/ManageAccount'>ManageAccount</Link>
            <a href = 'http://localhost:9999/logout'>Log out</a>
        </div>
        );
    }

    function adminUser(){
        return(
            <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/ManageBookings'>Manage Bookings</Link>
            <a href = 'http://localhost:9999/logout'>Log out</a>
        </div>
        )
    }

    function userLoggedIn(){
        if(cookies.loggedIn == true && cookies.userType == 1)
        {
            customerUser();
        }
        else if(cookies.loggedIn == true && cookies.userType == 2)
        {
            adminUser();
        }
        else
        {
            loggedOutUser();
        }
    }

    useEffect(() => {
        console.log(cookies);
    }, []);

    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/Login'>Login</Link>
        </div>
    );
    
}

export default NavDropdown;