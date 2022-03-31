import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    return(
            <div className = 'navbar'>
                <h1>Biscuit Bulk Barbering</h1>
                <Link to = '/NavDropdown'>☰</Link>
            </div>
    );
}

export default Navbar;