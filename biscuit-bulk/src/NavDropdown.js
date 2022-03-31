import React from 'react';
import { Link } from 'react-router-dom';

function NavDropdown() {
    return(
        <div className = 'navDropdown'>
            <Link to = '/'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/Login'>Login</Link>
        </div>
    );
}

export default NavDropdown;