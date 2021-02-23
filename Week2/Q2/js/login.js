function validation() {
    var email = document.getElementById("email").value;
    var pwd = document.getElementById("pwd").value;

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(email=='')
    {
        //alert("Enter the email");
        setErrorMsg(document.getElementById("email"), 'Email cannot be empty');
        return;
    }
    else if(!filter.test(email))
    {
        setErrorMsg(document.getElementById("email"), 'Enter valid email id.');
        return;
    }
    else if(email!=''){
        setErrorMsg(document.getElementById("email"), '');
    }

    if(pwd=='')
    {
        setErrorMsg(document.getElementById("pwd"), 'Enter the password');
        return;
    }
    else if(!pass.test(pwd))
    {
        setErrorMsg(document.getElementById("pwd"), 'Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.');
        return;
    }
    else if(pwd!=''){
        setErrorMsg(document.getElementById("pwd"), '');
    }

    alert('Thank You for Login');
    location.href = "welcome.html";
}

function setErrorMsg(input, errormsgs) {
//console.log(input.parentElement);
const formControl = input.parentElement;
const small = formControl.querySelector('small');
formControl.className = "form-control error";
//console.log(small);
small.innerText = errormsgs;
}