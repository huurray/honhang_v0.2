//loading
function loadingAni() {
  $('.loading__circle').animate({
    'margin': '0.5rem'
  }, 400, function () {
    $('.loading__circle').animate({
      'margin': '0'
    }, 400)
    loadingAni();
  })
}
loadingAni();

//회원가입
document.querySelector('.signupButton').addEventListener('click', function () {
  event.preventDefault();
  document.querySelector('.loading').classList.add('ing');
  
  var userEmail = document.querySelector('#email').value;
  var userPass = document.querySelector('#password').value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(function (user) {
      if (user) {
        window.location.replace("../index.html");
      }
    })
    .catch(function (error) {
      // Handle Errors here.

      document.querySelector('.loading').classList.remove('ing');

      var errorMessage = error.message;
      var errorScreen = document.querySelector(".small-popup__text");
      console.log(errorMessage)

      switch (errorMessage) {
        case "The email address is badly formatted.":
        errorMessage = "이메일주소가 올바르지 않습니다.";
        errorScreen.innerHTML = errorMessage;
        smallPopUpOpener();
        break;
        case "Password should be at least 6 characters":
        errorMessage = "비밀번호는 6자리 이상 입력해주세요.";
        errorScreen.innerHTML = errorMessage;
        smallPopUpOpener();
        break;
      }
    });
})

//popup opener
function smallPopUpOpener(){
  $('.small-popup').css({
    "opacity": "1",
    "visibility": "visible"
  });
  $('.small-popup__content').animate({
    "right": "2rem"
  }, 300);
}

//popup closer
$('.small-popup').on('click', function () {
  $('.small-popup__content').animate({
    "right": "-30rem"
  }, 300, function () {
    $('.small-popup').css({
      "opacity": "0",
      "visibility": "hidden"
    })
  })
})