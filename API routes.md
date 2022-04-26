# API routes
-------------
This page will list how to access the API, the routes and the parameters needed passing to and what will be returned.


Login: /auth

  Params: Username, Password

  Method: POST
  
  Cookies/Sessions set: [loggedin : TRUE , username : data that was passed in]
  
Logout: /logout

  Clears ALL session variables

Register: /register

  Params: fName, sName, email, password, dob

  Method: POST

Cuts: /cuts

  Returns JSON for all haircuts and their info.