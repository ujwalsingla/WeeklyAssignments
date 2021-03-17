$.ajaxSetup({
    contentType: "application/json; charset=utf-8"
  });
   $('.userId').focus(()=>{
       $('.error').css('display','none')
   })
  $(".submit").click(function(e){
      e.preventDefault();
      let p=$('input[name=userId]').val()
      if(p==="" || p===null){
          $('.error').css("display","block")
          return false
      }
      if(p!=="919530697527"){
          $('.error').html("Please Enter The correct userId******");
          $('.error').css("display","block")
          return false
      }
      $.ajax({
          url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/login",
          type: 'POST',
          data: JSON.stringify({msisdn:`${p}`}),
          error : function(err) { console.log('Error!', err) },
          success: (data)=> {
                if(data.token){
                    $.ajax({
                        url: "https://netco-indo-test.nfrnds.net:20003/fmcg-dd/initialData",
                        type: 'GET',
                        headers: {"Netco-JWT": data.token},
                        success:function(res){
                            sessionStorage.setItem('token',true );
                            window.location.href="./app.html" }
                      });
                  }
            }
      });
  }
)