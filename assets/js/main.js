import sendData from './ajax.js';
import {setCookie} from './cookie.js';
document.addEventListener('DOMContentLoaded', function(){

sendData();


    
$('a[href*=\\#]').on('click', function(event){     
  event.preventDefault();
  $('html,body').animate({scrollTop:$(this.hash).offset().top - 100}, 500);
});

  function setHeightData(){
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.querySelector('.wrapper').addEventListener('click', toggle);
        const answer = question.querySelector('.answer');
        const currHeight = answer.offsetHeight;
        answer.setAttribute('data-height', currHeight);
        answer.style.height = '0px';
        answer.classList.add('close');
    })
  };

  setHeightData();

  function toggle(){
    const answer = this.closest('.question').querySelector('.answer');
    if(answer.classList.contains('close')){
        answer.classList.remove('close');
        this.querySelector('h1').textContent = '-';
        let currHeight = answer.getAttribute('data-height');
        answer.style.height = `${currHeight}px`;
    }else{
        this.querySelector('h1').textContent = '+';
        answer.classList.add('close');
        answer.style.height = '0px';
    }
  };



  document.querySelector('#main-form').addEventListener('submit', submitForm);

  function submitForm(e){
   
      let errors  = [];
      const inputs = this.querySelectorAll('.form-input');
      for(let input of inputs){
      if(input.value.length == 0){
        input.closest('.input-block').querySelector('.error').style.height = '20px';
        errors.push(1);
      }else{
        input.closest('.input-block').querySelector('.error').style.height = '0px';
      }
    };

    if(errors.length > 0) {
      e.preventDefault();
      return;
    };

    const dataPropose = this.getAttribute('data-propose');
    
    if(dataPropose == "false"){
      e.preventDefault();
      document.querySelector('.main-form .special-propose_wrapper').style.display = 'flex';
      document.querySelector('.special-propose .proposition').addEventListener('click', function(){
        this.setAttribute('data-propose', 'true');
        liqpayData(300, 'Доступ до відео та КОМПЛЕКС ОЗДОРОВЧОЇ ГІМНАСТИКИ “9 СИЛ”');
      });
      document.querySelector('.special-propose button').addEventListener('click',  function(){
        liqpayData(100, 'Доступ до відео');
      });
    };
  };



  function saveUserData(){
    const data =  {
      name: document.querySelector('#main-form input[name="name"]').value,
      email: document.querySelector('#main-form input[name="email"]').value
    };
    setCookie('userData', JSON.stringify(data));
  }

  
  function liqpayData(amount, description){
    const uniqId =  Date.now() + Math.floor(Math.random());
    $.ajax({
      url:"data.php",
      method:"POST",
      data:{
        id:uniqId,
        amount,
        description,

      },
      success:function(response){
        response = JSON.parse(response);
        console.log(response);
        document.querySelector('#main-form input[name="data"]').value = response.data;
        document.querySelector('#main-form input[name="signature"]').value =  response.signature;
        saveUserData();
        $('#main-form').trigger('submit');
      }
    });     
   };

   document.querySelector('#get-contacts').addEventListener('click', function(){
     const list = this.closest('.footer-nav').querySelector('ul');
     if(this.classList.contains('open')){
      list.style.height = '0px';
      list.style.margin = '0px';
      this.classList.remove('open');
     }else{
      list.style.height = '140px';
      list.style.margin = '10px 0px';
      this.classList.add('open');
     }
      
   });

});