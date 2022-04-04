import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbarDropdown() {
    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/ManageBookings'>Manage Bookings</Link>
            <Link to = '/Login'>Log out</Link>
        </div>
    );
}

export default AdminNavbarDropdown;