function validation(form) {
        var uname = document.getElementById("full_name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
		var pwd = document.getElementById("pwd").value;
        var cpwd = document.getElementById("cpwd").value;
		var dob = document.getElementById("dob").value;
		var gen = myform.querySelectorAll('input[name="gender"]:checked');

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
			//alert("In Name enter the alphabets only.");
			setErrorMsg(document.getElementById("full_name"), 'Enter the alphabets only.');
			return;
		}
		else if(uname!=''){
			setErrorMsg(document.getElementById("full_name"), '');
		}

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

        if(phone=='')
		{
			setErrorMsg(document.getElementById("phone"), 'Enter the Mobile Number');
			return;
		}
		else if(!numbers.test(phone))
		{
			setErrorMsg(document.getElementById("phone"), 'Enter the numeric values only.');
			return;
		}
		else if(phone!=''){
			setErrorMsg(document.getElementById("phone"), '');
		}

		if(dob =='')
		{
			setErrorMsg(document.getElementById("dob"), 'DOB cannot be empty');
			return;
		}
		else if(dob!=''){
			setErrorMsg(document.getElementById("dob"), '');
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

        if(cpwd=='')
        {
			setErrorMsg(document.getElementById("cpwd"), 'Enter the confirm password');
			return;
        }
        else if(pwd!=cpwd)
        {
			setErrorMsg(document.getElementById("cpwd"), 'Password not matched with Confirm Password.');
			return;
        }
		else if(cpwd!=''){
			setErrorMsg(document.getElementById("cpwd"), '');
		}

		if(!gen.length)
		{
			setErrorMsg(document.getElementById("gen"), 'Enter the Gender.');
			return;
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
