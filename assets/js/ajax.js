import {deleteCookie, getCookie} from './cookie.js';

function successAlert(email){
    $('.success-alert span').text(email);
    $('.success-alert').css('top','100px');

    setTimeout(()=>{
        $('.success-alert').css('top','-100vh');
    }, 5000);

    };

function failureAlert(){
    $('.failure-alert').css('top','100px');
    setTimeout(()=>{
        $('.failure-alert').css('top','-100vh');
    }, 5000);
};

export default function sendData(){
    if(getCookie('liqpay_data')){
      let liqPay = JSON.parse(getCookie('liqpay_data'));
      let status = liqPay.status;
      if(status == 'success'){
        let userData = getCookie('userData');
        userData = JSON.parse(userData);
        const email = userData.email;
    $.ajax({
      url:"mailer.php",
      method:"POST",
      data:{
        name:userData.name,
        email:userData.email
      },
      success:function(response){
        response = response;
        let index = response.indexOf('{');
        let data = JSON.parse(response.slice(index));
         if(data.success == 'true'){
            successAlert(email);
          }else{
            failureAlert();
          }
      }
    });
      } else{
        failureAlert();
      }
      deleteCookie('liqpay_data');
      }
   };