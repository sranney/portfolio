//set up Express.js server
const express = require("express");
//create an Express app
const app = express();
//import body-parser
const bodyParser = require("body-parser");
//serve the static css and js files as well as the html file
app.use(express.static(__dirname+"/public"));
//set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

require("./routes/routes.js")(app,sgMail);

//create a port variable
const port = process.env.PORT||5000;
//set up server to listen on port
const server = app.listen(port);


