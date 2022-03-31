import React from 'react';
import Navbar from './Navbar.js';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavDropdown from './NavDropdown.js';
import Booking from './Booking.js';
import Login from './Login.js';
import Home from './Home.js';
import Footer from './Footer.js';
import Register from './Register.js';

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
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;