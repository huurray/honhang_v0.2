//상태체크

function stateMenu() {
  $('.header__state-menu').on('click', function () {
    if ($('.header__state-menu').hasClass('menuOn')) {

      $('.header__current-state').css("opacity", "0");

      if($('.header__icon-arrow').attr("src") == "../img/up-arrow.png"){
        $('.header__icon-arrow').attr("src", "../img/down-arrow.png");
      } else if ($('.header__icon-arrow').attr("src") == "../img/up-arrow-black.png"){
        $('.header__icon-arrow').attr("src", "../img/down-arrow-black.png");
      }

      $('.header__state-menu').removeClass('menuOn');
    } else {

      $('.header__current-state').css("opacity", "1");
      
      if($('.header__icon-arrow').attr("src") == "../img/down-arrow.png"){
        $('.header__icon-arrow').attr("src", "../img/up-arrow.png");
      } else if ($('.header__icon-arrow').attr("src") == "../img/down-arrow-black.png"){
        $('.header__icon-arrow').attr("src", "../img/up-arrow-black.png");
      }

      $('.header__state-menu').addClass('menuOn');
    }
  })
}
stateMenu();


// Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if (user.emailVerified) {
      window.location.replace("./makeup.html");
    } else {
      window.location.replace("./auth.html");
    }
  } else {
    window.location.replace("./signin.html");
  }
}

//all board
const boardAll = document.querySelector(".boardAll");
boardAll.addEventListener("click", function() {
  window.location.href = "./boardall.html";
});

//update profile and email authentication
const db = firebase.firestore();
const docRefForUser = db.collection("users");
const authButton = document.querySelector("#authButton");
const inputTextMyName = document.querySelector("#myName");
const inputTextMyAge = document.querySelector("#myAge");
const inputTextMyCity = document.querySelector("#myCity");
const inputTextMyPhone = document.querySelector("#myPhone");
const inputTextMyKakaoId = document.querySelector("#myKakaoId");

function authStateChange() {
  var user = firebase.auth().currentUser;
  user.reload().then(function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var email = user.email;
        var emailVerified = user.emailVerified;
        var txtConform = "이메일 인증이 완료되었습니다!";

        document.querySelector("#myEmail").value = email;
        if (emailVerified) {
          $(".auth__conform-email").html(txtConform);
        } else {
        }
      }
    });
  });

  if(kakaoKeyId !==""){
    $(".auth__conform-kakao").html("카카오 프로필 연동이 완료되었습니다!");
  }
}

setInterval(authStateChange, 1000);

authButton.addEventListener("click", function() {
  var user = firebase.auth().currentUser;
  user.reload().then(function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var email = user.email;
        var uid = user.uid;
        var emailVerified = user.emailVerified;
        var selectedName = inputTextMyName.value;
        var selectedAge = inputTextMyAge.value;
        var selectedCity = inputTextMyCity.value;
        var selectedPhone = inputTextMyPhone.value;
        var selectedKakaoId = inputTextMyKakaoId.value;

        if (
          selectedName !== "" &&
          selectedAge !== "" &&
          selectedCity !== "" &&
          selectedPhone !== "" &&
          selectedKakaoId !== ""
        ) {
          if (emailVerified) {
            if (kakaoKeyId !== "") {
              if ($("#auth-agree4").is(":checked")) {
                docRefForUser
                  .add({
                    email: email,
                    uid: uid,
                    name: selectedName,
                    age: selectedAge,
                    city: selectedCity,
                    phone: selectedPhone,
                    kakaoId: selectedKakaoId,
                    kakaoBigImg: kakaoProfileImage,
                    kakaoSmallImg: kakaoThumbImage
                  })
                  .then(function(data) {
                    window.location.href = "./makeup.html";
                  })
                  .catch(function(error) {
                    console.log("error:", error);
                  });
              } else {
                popUpOpen(4);
              }
            } else {
              popUpOpen(3);
            }
          } else {
            popUpOpen(2);
          }
        } else {
          popUpOpen(1);
        }
      }
    });
  });
});

$(".auth__email-button").on("click", function() {
  const user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(function() {
      popUpOpen(5);
    })
    .catch(function(error) {
      // An error happened.
    });
});

//agree checkbox ALL
$(".auth__checkbox").each(function(i) {
  $("#auth-agree4").on("click", function() {
    if ($(this).is(":checked")) {
      $(`#auth-agree${i + 1}`).prop("checked", true);
    } else {
      $(`#auth-agree${i + 1}`).prop("checked", false);
    }
  });
});

//backButton
$("#backButton").on("click", function() {
  window.location.href = "../index.html";
});

//popup opener
function popUpOpen(i) {
  switch (i) {
    case 1:
      $(".small-popup__text").html("인적사항를 모두 입력해주세요!");
      break;
    case 2:
      $(".small-popup__text").html("이메일을 인증 해주세요!");
      break;
    case 3:
      $(".small-popup__text").html("카카오 프로필 연동을 해주세요!");
      break;
    case 4:
      $(".small-popup__text").html("이용약관에 모두 동의 해주세요!");
      break;
    case 5:
      $(".small-popup__text").html("이메일로 인증메일을 보냈습니다!");
      break;
  }

  $(".small-popup").css({
    opacity: "1",
    visibility: "visible"
  });
  $(".small-popup__content").animate(
    {
      right: "2rem"
    },
    300
  );
}
//popup closer
$(".small-popup").on("click", function() {
  $(".small-popup__content").animate(
    {
      right: "-30rem"
    },
    300,
    function() {
      $(".small-popup").css({
        opacity: "0",
        visibility: "hidden"
      });
    }
  );
});

//kakao 연동

var kakaoKeyId = "";
var kakaoProfileImage = "";
var kakaoThumbImage = "";

Kakao.init("ebc7930ec309165c494faf3f9e0837a2");
// 카카오 로그인 버튼을 생성합니다.
Kakao.Auth.createLoginButton({
  container: "#kakao-login-btn",
  success: function(authObj) {
    // 로그인 성공시, API를 호출합니다.
    Kakao.API.request({
      url: "/v1/user/me",
      success: function(res) {
        kakaoKeyId = res.id;
        kakaoProfileImage = res.properties.profile_image;
        kakaoThumbImage = res.properties.thumbnail_image;
        console.log(res.properties.profile_image)
      },
      fail: function(error) {
        console.log(JSON.stringify(error));
      }
    });
  },
  fail: function(err) {
    console.log(JSON.stringify(err));
  }
});

//약관 내용보기 window.open
$('.auth-agreement').on('click', function(){
  event.preventDefault();
  window.open("./agreement.html");
})
$('.auth-privacy').on('click', function(){
  event.preventDefault();
  window.open("./privacy.html");
})