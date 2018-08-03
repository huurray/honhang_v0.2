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