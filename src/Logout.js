import React from 'react';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
 

function Logout() {

    let logOut = () => {

        Cookies.remove("loggedin");
      
      }

    return(
        <button onClick = {logOut}>logout</button>
    );
}

export default Logout;