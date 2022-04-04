import React from 'react';
import { Link } from 'react-router-dom';

function UserNavbarDropdown() {
    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/Booking'>Booking</Link>
            <Link to = '/ManageAccount'>ManageAccount</Link>
            <a href = 'http://localhost:9999/logout'>Log out</a>
        </div>
    );
}

export default UserNavbarDropdown;