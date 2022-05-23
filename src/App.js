
/*Importing all of the other JavaScript files containing the pages. Also importing 
the browser router module in order to set up the routes.*/
import React from 'react';
import Navbar from './Navbar.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavDropdown from './NavDropdown.js';
import Booking from './Booking.js';
import Login from './Login.js';
import Home from './Home.js';
import Footer from './Footer.js';
import ResetPassword from './ResetPassword.js';
import ManageUserAccount from './ManageUserAccount.js';
import ManageBookings from './ManageBookings.js';
import ManageCuts from './ManageCuts.js';
import Payment from './Payment.js'

function App() {
    /*The router element surrounds the entire application. 
    Divs separate each section of the application (App and page content) where page content is what each page generates.
    The pages are generated by calling the route path from the other JSX files. Navbar and footer is always shown in the app either side of the page
    content */
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
                        <Route path = '/ResetPassword' element = {<ResetPassword/>} />
                        <Route path = '/ManageUserAccount' element = {<ManageUserAccount/>} />
                        <Route path = '/ManageBookings' element = {<ManageBookings/>} />
                        <Route path = '/ManageCuts' element = {<ManageCuts/>} />
                        <Route path = '/Payment' element = {<Payment/>} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;