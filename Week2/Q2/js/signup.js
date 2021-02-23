function validation() {
        var uname = document.getElementById("full_name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
		var pwd = document.getElementById("psw").value;
        var cpwd = document.getElementById("cpsw").value;

        var letters = /^[A-Za-z\s]+$/;
        var numbers = /^[0-9]+$/;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

		if(uname =='')
		{
			setErrorMsg(document.getElementById("full_name"), 'Name cannot be empty');
			return;
		}
        else if(!letters.test(uname))
		{
			alert("In Name enter the alphabets only.");
			return;
		}

		if(email=='')
		{
        	alert("Enter the email");
			return;
		}
		else if(!filter.test(email))
		{
			alert("Enter valid email id.");
			return;
		}

        if(phone=='')
		{
        	alert("Enter the Mobile Number");
			return;
		}
		else if(!numbers.test(phone))
		{
			alert("In Mobile enter the numeric values only.");
			return;
		}

        if(pwd=='')
		{
        	alert("enter the password");
			return;
		}
		else if(!pass.test(pwd))
		{
			alert("Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.");
			return;
		}

        if(cpwd=='')
        {
            alert("Enter the Confirm Password");
			return;
        }
        else if(pwd!=cpwd)
        {
            alert("Password not matched with Confirm Password.");
			return;
        }

		alert('Thank You for Login');
		location.href = "https://www.campuslife.co.in";
}

function setErrorMsg(input, errormsgs) {
	console.log(input.parentElement);
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = "form-control error";
	console.log(small);
	small.innerHTML = errormsgs;
}

/*let arr = [];
const addData = (ev) => {
    ev.preventDefault();  // to stop the form submitting
    let Data = {
        email: document.getElementById('email').value;
        pwd: document.getElementById('psw').value;
    }
    arr.push(Data);
    localStorage.setItem('UserData', JSON.stringify(arr));
}*/
