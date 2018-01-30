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
const APIKey = process.env.SENDGRID_API_KEY || require("../bootcamp_sar/secrets/developer_sendgridkey");

sgMail.setApiKey(APIKey);


//create a port variable
const port = process.env.PORT||5000;
//set up server to listen on port
var server = require("http").createServer(app);

//listening on port 5000
server.listen(port);


app.get("/",(req,res)=>{
    res.sendFile("index.html");
});

//send email
app.post("/sendMessage",(req,res) => {
    console.log(req.body);
    const msgSubj = `Connection - ${req.body.name}`;
    const msgBody = `${req.body.name} at ${req.body.email} wants to connect with you.<br>Here is their message: ${req.body.message}`;
    
    const msg = {
    to: 'spencerranney@gmail.com',
    cc: req.body.email,
    from: 'spencer.ranney.developer@gmail.com',
    subject: msgSubj,
    html: msgBody,
    };
    sgMail.send(msg).catch(err=>console.log(err));
    
    res.send(req.body.name);
})


