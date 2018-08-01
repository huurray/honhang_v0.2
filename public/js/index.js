//Auth
function isSignIn() {
  var user = firebase.auth().currentUser;
  if (user) {
    if (user.emailVerified) {
      window.location.replace("./pages/makeup.html");
    } else {
      window.location.replace("./pages/auth.html");
    }
  } else {
    window.location.replace("./pages/signin.html")
  }
}

//data search

const db = firebase.firestore();
const docRefSearch = db.doc("searchValue/value");
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const searchButton = document.querySelector('#searchButton');
const boardAll = document.querySelector('.boardAll');


searchButton.addEventListener('click', function () {
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = inputTextDate.value;
  var selectedTIme = inputTextTime.value;
  var selectedHowMany = inputTextHowMany.value;
  var errorScreen = document.querySelector(".small-popup__text");

  if (selectedPlace != "") {

    docRefSearch.set({
      selectedPlace: selectedPlace
    }).then(function () {
      window.location.href = './pages/board.html';
    }).catch(function (error) {
      console.log("error:", error)
    });
  } else {
    errorScreen.innerHTML = "잠깐! 여행지만이라도 알려주세요.";
    smallPopUpOpener();
  }

});

//all board
boardAll.addEventListener('click', function () {
  window.location.href = './pages/boardall.html';
})

//date picker API
$('#selectedDate').fdatepicker({
  format: 'yyyy/mm/dd'
});

//time picker API
$(document).ready(function () {
  $('#selectedTIme').timepicker({
    timeFormat: 'h:mm p', //1:00 PM
    interval: 60, //시간간격
    minTime: '7', //최소시간
    maxTime: '8:00pm', //최대시간
    startTime: '7:00', //최소시간
    dynamic: false,
    dropdown: true,
    scrollbar: false
  });
});

//nav bar toggle
var scrollState = true;
$(window).scroll(function () {
  var nav = $(".header-container");

  if ($(window).scrollTop() > nav.height() && scrollState == true) {
    nav.addClass('scrolled');
    $(".header__logo").attr("src", "./img/logo-black.png");
    $(".header__icon").attr("src", "./img/down-arrow-black.png");
    scrollState = false;
  } else if ($(window).scrollTop() <= nav.height() && scrollState == false) {
    nav.removeClass('scrolled');
    $(".header__icon").attr("src", "./img/down-arrow.png");
    $(".header__logo").attr("src", "./img/logo-white.png");
    scrollState = true;
  }
});

//nav bar navigate
$('.scrollNavi-category').find('a').on("click", function () {
  $('html, body').animate({
    scrollTop: $('.section-category').offset().top - 100
  }, 1000)
});

//image slider
var imageIndex = 0;

function imageSlide() {
  const images = $(".bg-image__pic");
  images.each(function (pic) {
    images[pic].style.display = "none";
  });
  imageIndex++;
  if (imageIndex > images.length) {
    imageIndex = 1
  };
  images[imageIndex - 1].style.display = "block";
  setTimeout(imageSlide, 10000);
}

imageSlide();

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


