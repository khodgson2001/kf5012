import React from "react";
import { useCookies } from "react-cookie";

function ManageUserAccount () {

    const [cookies, setCookie] = useCookies();


    return (
        <div className="manageUserAccount">
            <h2>Account</h2>
            <p>Username: {cookies.username}</p>
            <button tupe = "button">Change Password</button>
            <h3>Upcoming booking</h3>
            <p>Info about upcoming booking</p>
        </div>
    );
}

export default ManageUserAccount;