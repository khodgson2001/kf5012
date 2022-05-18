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
            if(cookies.userType == 1)
            {
                setCustomerUser(true);
                setAdminUser(false);
            }
            else if(cookies.userType == 2)
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


    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            {customerUser && <Link to = '/Booking'>Booking</Link>}
            {customerUser && <Link to = '/ManageUserAccount'>Manage Account</Link>}
            {adminUser && <Link to = '/ManageBookings'>Manage Bookings</Link>}
            {loggedIn && <a href = 'http://localhost:9999/logout'>Logout</a>}
            {!loggedIn && <Link to = '/Login'>Login</Link>}
            
            
        </div>
    );
    
}

export default NavDropdown;