import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";


function NavDropdown() {

    const [loggedIn, setLoggedIn] = useState(false);

    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        console.log(cookies);
    }, []);

    /*Logout link is TEMP */
    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/Login'>Login</Link>
            <Link to = '/Logout'>Logout</Link>
        </div>
    );
    
}

export default NavDropdown;