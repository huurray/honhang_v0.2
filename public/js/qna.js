//Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if (user.emailVerified) {
      window.location.replace("./makeup.html");
    } else {
      window.location.replace("./auth.html");
    }
  } else {
    window.location.replace("./signin.html")
  }
}

//all board
const boardAll = document.querySelector('.boardAll');
boardAll.addEventListener('click', function () {
  window.location.href = './boardall.html';
})

//tab menu
$('.qna__menu').each(function (index) {

  $('.qna__list').eq(0).css("display", "block");

  $(this).on("click", function () {
    $(this).addClass('qna__menu-on').siblings().removeClass('qna__menu-on');
    $('.qna__list').eq(index).css("display", "block").
    siblings().css("display", "none");
  })
})


$('.qna__list-item').each(function (index) {
  $(this).on("click", function () {
    $(this).find('.qna__content').slideToggle();
    $(this).siblings().find('.qna__content').css("display", "none");
  })
})