function validation(form) {
    var phone = document.getElementById('phone').value;
    
    if(phone.length < 12) {
      setErrorMsg(document.getElementById('phone'), 'Enter the valid Mobile Number');
      return;
    }

    var body = {
      "msisdn": document.getElementById('phone').value,
      "loginType":"KAIZALA",
      "groupId":"",
      "KIS":"",
      "actionPackageId":"",
      "version":"",
      "minorVersion":"",
    }

    $.ajax({
    url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
    type: "POST",
    error: function(res) {
      console.log('User is Invalid!', res);
    },
    success: function(data) {
      if(data.token) {
        $.ajax({
                                url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData",
                                type: 'GET',
                                headers: {"Netco-JWT": data.token},
                                success:function(res){ 
                                    sessionStorage.setItem('token',true );
                                    alert('You are Successfully logged in.');
                  window.location.href="./app.html"; }
                              });
      }
      else {
        setErrorMsg(document.getElementById('phone'), 'User is Invalid!');
      }
    },
    });
  }

  function setErrorMsg(input, errormsgs) {
      event.preventDefault();
      const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = "form-control error";
        small.innerText = errormsgs;
  }