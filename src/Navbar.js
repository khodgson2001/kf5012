import React from 'react';
import { Link } from 'react-router-dom';

//Function that is the navbar that is always displayed at the top of the page on the site
function Navbar() {
    return(
            <div className = 'navbar'>
                <h1>Biscuit Bulk Barbering</h1>
                <Link to = '/NavDropdown'>☰</Link>
            </div>
    );
}

export default Navbar;