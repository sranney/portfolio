module.exports = (app,sgMail)=>{
    //serve the html file for when the user goes to a webpage
    app.get("/",(req,res)=>{
        res.sendFile("index.html");
    });

    //send email
    app.post("/sendInvite",(req,res) => {
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
};