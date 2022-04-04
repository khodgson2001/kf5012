import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbarDropdown() {
    return(
        <div className = 'navDropdown'>
            <Link to = '/kf5012'>Home</Link>
            <Link to = '/ManageBookings'>Manage Bookings</Link>
            <a href = 'http://localhost:9999/logout'>Log out</a>
        </div>
    );
}

export default AdminNavbarDropdown;