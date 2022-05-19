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
- MySQL Database running on port 3306 (default port)

Step 1: Start your MySQL database (this explanation presumes you have/know how to install and set up your own MySQL server)
Step 2: If you have not done so yet, import `biscuitbulk.sql` into your MySQL database server. This should populate it with several tables, all of which contain their own insert statements.

Step 3: In a terminal/command prompt window, navigate to the KF5012 folder, and then to the API folder within that.
Step 4: Run `node install` to install the correct node modules (FYI we use the following: alert, cookie-parser, mysql2), and then run the command `node api.js`. This will then launch the API on your local server/localhost on port 9999

Step 5: In another terminal/command prompt window, navigate to the KF5012 folder run `node install` again to install the modules for the front end, and then run the command `npm start` to run the React application on your localhost on port 3000.

# Updating the repo
Where possible, please do not commit directly to the main branch. Create your own branch, or use an exisiting one. This is to prevent any changes causing issues for others if they're working on the same files.
