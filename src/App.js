import React from 'react';
import Navbar from './Navbar.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavDropdown from './NavDropdown.js';
import Booking from './Booking.js';
import Login from './Login.js';
import Home from './Home.js';
import Footer from './Footer.js';
import Register from './Register.js';
import ResetPassword from './ResetPassword.js';
import AdminNavbarDropdown from './AdminNavbarDropdown.js';
import UserNavbarDropdown from './UserNavbarDropdown.js';
import ManageUserAccount from './ManageUserAccount.js';
import ManageBookings from './ManageBookings.js';

function App() {
    return (
        <Router>
            <div className = 'App'>
                <Navbar/>
                <div className = 'pageContent'>
                    <Routes>
                        <Route path = '/NavDropdown' element = {<NavDropdown/>}/>
                        <Route path = '/kf5012' element = {<Home/>} />
                        <Route path = '/Booking' element = {<Booking/>} />
                        <Route path = '/Login' element = {<Login/>} />
                        <Route path = '/Register' element = {<Register/>} />
                        <Route path = '/ResetPassword' element = {<ResetPassword/>} />
                        <Route path = '/ManageAccount' element = {<ManageUserAccount/>} />
                        <Route path = '/ManageBookings' element = {<ManageBookings/>} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;