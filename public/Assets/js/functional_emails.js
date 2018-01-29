//sending emails
const NameInput = Emailer.querySelector("#name");
const EmailInput = Emailer.querySelector("#email");
const MsgInput = Emailer.querySelector("#message");
const SuccessOverlay = document.querySelector(".success-overlay");
const SuccessMessage = document.querySelector(".success-message");

function SendEmail(event) {

    event.preventDefault();

    //get user inputs
    const name = NameInput.value;
    const email = EmailInput.value;
    const message = MsgInput.value;
    
    //only accept if there are entries for each of these fields
    if(name.length !== 0 && email.length !== 0 && message.length !== 0){
        //post request to the server that will send email information
        $.post( "/sendInvite", {name,email,message})
        .done((data)=>{//show overlay that will take user thanks for connecting
            SuccessOverlay.classList.add("popup");
            SuccessMessage.textContent = `Thank you for reaching out to me, ${data}! I'll be in touch soon.`;
            setTimeout(()=>SuccessOverlay.classList.remove("popup"),5000);
            NameInput.value = "";
            EmailInput.value = "";
            MsgInput.value = "";
        });        

    }
}

//add SendEmail as the callback function for the click event on the send button
Emailer.addEventListener("submit",SendEmail);