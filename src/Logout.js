import React from 'react';
import { Navigate } from 'react-router-dom';


function Logout() {
    return <Navigate to = "http://localhost:9999/logout"/>
}

export default Logout;