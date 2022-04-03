# KF5012 - Team Biscuit Bulk



# Overview
This is the Github repo for our project; A barbering booking site. The website will provide use to both customers and the barber shop owner through an authority-based login system. On one end, the website will deal with payments from customers, allow customers to arrange or cancel haircuts and view upcoming appointments among other features. On the other side, the administrator will be able to cancel, reject or rearrange bookings with certain clients, change pricing, times and dates live on the website alongside other general administrative features. 

# Technologies
We plan on using the following technologies:
- React Framework + Bootstrap CSS
- Node.JS, Express
- MySQL

# Focuses
James will be working on the design of the site, and Jason will then develop the front-end based on these designs. Kieran will be focussing on the back-end development for the application, and also designing and implementing the databases for the site. Jason will also be looking at implementing a payment gateway into the site, and James will be working on converting the website into a mobile application.

# Deployment
This project runs in 3 seperate parts:
- API
- Frontend
- Database

The API uses NodeJS with Express. This runs on port 9999. You will need to launch a terminal in the [folder] and first ensure you have the correct Node modules (use `node install`) and then run the command `node login.js` (the file name will be changed at some point). This will then start a local server on port 9999.
The Frontend of this site is built with NodeJS and React. This is ran on port 3000. You will need to launch a terminal in the root directory, ensure you have the correct Node modules (use `node install`) and then run the command `npm start`. This will run a local server on port 3000.
The Database uses MySQL. You will need to take the creation script from (insert file here), start your own local MySQL database and then run the script.

# Updating the repo
Where possible, please do not commit directly to the main branch. Create your own branch, or use an exisiting one. This is to prevent any changes causing issues for others if they're working on the same files.
