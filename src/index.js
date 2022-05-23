import React from "react";
import ReactDOM from "react-dom";
import App from './App.js';
import './index.css';
//Importing the cookies
import { CookiesProvider } from "react-cookie";
 
ReactDOM.render(
  //wrapped in a cookie provider for the site and then renders the site through the App.js file
  <CookiesProvider>
  <App/>
  </CookiesProvider>, document.getElementById("root")
);