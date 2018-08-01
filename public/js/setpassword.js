    //비밀번호 재설정
    function setNewPassword() {
      var auth = firebase.auth();
      var userEmail = document.querySelector('#email').value;
      var errorScreen = document.querySelector(".small-popup__text");
      
      auth.sendPasswordResetEmail(userEmail).then(function () {
        errorScreen.innerHTML = "입력하신 이메일로 메일이 발송되었습니다!"
        smallPopUpOpener();
      }).catch(function (error) {
        var errorMessage = error.message;
        switch (errorMessage) {
          case "The email address is badly formatted.":
          errorMessage = "이메일주소가 올바르지 않습니다.";
          errorScreen.innerHTML = errorMessage;
          smallPopUpOpener();
          break;
          case "There is no user record corresponding to this identifier. The user may have been deleted.":
          errorMessage = "가입하신 이메일주소가 없습니다.";
          errorScreen.innerHTML = errorMessage;
          smallPopUpOpener();
          break;
        }
      });
    }

    //popup opener
    function smallPopUpOpener() {
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