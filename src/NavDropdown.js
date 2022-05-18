import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";


function NavDropdown() {

    const [cookies, setCookie] = useCookies();

    const [loggedIn, setLoggedIn] = useState(false);

    const [customerUser, setCustomerUser] = useState(false);

    const [adminUser, setAdminUser] = useState(false);

    

    function evaluateUser() {
        if(cookies.loggedin == 'true')
        {
            setLoggedIn(true);
            if(cookies.userType === 1)
            {
                setCustomerUser(true);
                setAdminUser(false);
            }
            else if(cookies.userType === 2)
            {
                setAdminUser(true);
                setCustomerUser(false);
            }
            else
            {
                setLoggedIn(false);
            }
        }
        else
        {
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        console.log(cookies);
        evaluateUser();
    }, []);

    //Try use variables that represent each button e.g. 1st button, 2nd button, 3rd button and assign those the values based upon the if statements above

    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            {loggedIn && <a href = 'http://localhost:9999/logout'>Logout</a>}
            {!loggedIn && <Link to = '/Login'>Login</Link>}
            {customerUser && <Link to = '/ManageUserAccount'>Manage Account</Link>}
            {adminUser && <Link to = '/ManageBookings'>Manage Bookings</Link>}
            
        </div>
    );
    
}

export default NavDropdown;