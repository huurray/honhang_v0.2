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


//data download
let searchValue = "";

function getSearchValue() {
  const db = firebase.firestore();
  const docRefSearch = db.doc("searchValue/value");

  return docRefSearch.get().then(function (doc) {
    if (doc.exists) {
      searchValue = doc.data().selectedPlace;
      $('.showSearchValue').html(`"${searchValue}"으로 검색하였습니다.`)
    } else {
      console.log("No such document!");
    }
    return searchValue
  });
}

function currentDateNum() {
  const date = new Date();
  let getYear = date.getFullYear();
  let getMonthNum = date.getMonth();
  let getDate = date.getDate();

  if (getMonthNum < 9) {
    getMonth = `0${getMonthNum+1}`
  } else {
    getMonth = getMonthNum + 1
  }

  let currentDateString = `${getYear}${getMonth}${getDate}`;
  let currentDate = parseInt(currentDateString);

  return currentDate;
}


var PROJECT_ID = 'honghang-7ba3f'
var ALGOLIA_APP_ID = 'LCW2SDIQSU';
var ALGOLIA_SEARCH_KEY = '37953a1db3c8409d1f48f74c46aa107f';


function getDataList() {
  var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);
  var index = client.initIndex('donghang');
  const currentDate = currentDateNum();
  let dataList = [];

  return index.search({
    query: searchValue
  }).then(function (responses) {
    dataList = responses.hits.filter(arr => arr.dateNum > currentDate)

    dataList.map(function (data, i) {
      let addLi = document.createElement('li');
      let addDivForTitle = document.createElement('div');
      let addDivForDetail = document.createElement('div');
      let addDivForDetailRow1 = document.createElement('div');
      let addDivForDetailRow2 = document.createElement('div');
      let addDivForDetailAbsol = document.createElement('div');
      let addDivForTitle2 = document.createElement('h1');
      let addParaForCity = document.createElement('h2');
      let addParaForPlace = document.createElement('h2');
      let addParaForDate = document.createElement('h3');
      let addParaForTime = document.createElement('h3');
      let addParaForHowMany = document.createElement('h3');
      let addParaForContent = document.createElement('p');
      let addDivForContact = document.createElement('div');

      addLi.classList.add('board__list-item');
      addDivForTitle.classList.add('board__list-title', 'heading-secondary', 'heading-secondary--white');
      addDivForDetail.classList.add('detail__content');
      addDivForDetailRow1.classList.add('detail__row1');
      addDivForDetailRow2.classList.add('detail__row2');
      addDivForDetailAbsol.classList.add('detail__absol');
      addDivForTitle2.classList.add('detail-h1');
      addParaForCity.classList.add('detail-h2');
      addParaForPlace.classList.add('detail-h2');
      addParaForDate.classList.add('detail-h3');
      addParaForTime.classList.add('detail-h3');
      addParaForHowMany.classList.add('detail-h3');
      addParaForContent.classList.add('detail-p');
      addDivForContact.classList.add('detail__contact', 'detail-h2');

      document.querySelector('.board__list').appendChild(addLi);
      document.querySelector('.detail__modal').appendChild(addDivForDetail);
      document.querySelectorAll('.board__list-item')[i].appendChild(addDivForTitle);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForTitle2);

      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailRow1);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailRow2);
      document.querySelectorAll('.detail__content')[i].appendChild(addDivForDetailAbsol);

      document.querySelectorAll('.detail__row1')[i].appendChild(addParaForCity);
      document.querySelectorAll('.detail__row1')[i].appendChild(addParaForPlace);
      document.querySelectorAll('.detail__row2')[i].appendChild(addParaForDate);
      document.querySelectorAll('.detail__row2')[i].appendChild(addParaForTime);
      document.querySelectorAll('.detail__content')[i].appendChild(addParaForHowMany);
      document.querySelectorAll('.detail__content')[i].appendChild(addParaForContent);
      document.querySelectorAll('.detail__absol')[i].appendChild(addDivForContact);

      let number = '';
      if (i < 9) {
        number = `0${i+1}`
      } else {
        number = `${i+1}`
      }

      document.querySelector('.board__total').innerHTML = `TOTAL ${dataList.length}`
      addDivForTitle.innerHTML = `<p class="tiny-para">${number}&nbsp;&nbsp;-&nbsp;</p>${data.title}`;
      addDivForTitle2.innerHTML = `<p class="detail-p-title">제목.&nbsp;</p>${data.title}`;
      addParaForCity.innerHTML = `<p class="detail-p-title">도시.&nbsp;</p> ${data.city}`;
      addParaForPlace.innerHTML = `<p class="detail-p-title">여행지.&nbsp;</p> ${data.place}`;
      addParaForDate.innerHTML = `<p class="detail-p-title">날짜.&nbsp;</p> ${data.date}`;
      addParaForTime.innerHTML = `<p class="detail-p-title">시간.&nbsp;</p> ${data.time}`;
      addParaForHowMany.innerHTML = `<p class="detail-p-title">최대인원.&nbsp;</p> ${data.howMany}명`;
      addParaForContent.innerHTML = `<p class="detail-p-title">내용.&nbsp;</p> ${data.content}`;
      addDivForContact.innerHTML = `<p class="detail-p-title kakao-title">카카오톡ID.&nbsp;</p><div class='kakao-id'>${data.kakao}</div>`;

      //open profile
      document.querySelectorAll('.kakao-id')[i].addEventListener('click', function () {
        getUserData(data.kakao)
      })

    })
    return dataList;
  });
}

async function asyncCall() {
  //loading 
  document.querySelector('.loading').classList.add('ing');
  const searchValue = await getSearchValue();
  const dataList = await getDataList();
  //done 
  document.querySelector('.loading').classList.remove('ing');
  openListDetail();
}
asyncCall();

//list and content
function openListDetail() {
  $('.board__list-item').each(function (index) {
    $(this).on("click", function () {
      closeProfile();
      $('.detail__content').eq(index).animate({
        "right": "0",
        "opacity": "1"
      }, 500).siblings('.detail__content').animate({
        "right": "-50rem",
        "opacity": "0"
      })
      $('.detail__content').eq(index).css("display", "block").siblings('.detail__content').css("display", "none");
      $(this).addClass('active').siblings().removeClass('active');
      $(this).find('.board__list-title').addClass('active').parent().siblings().find('.board__list-title').removeClass('active');
    })
  })
}

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

//re-search ani
$('.side-nav').on('click', function () {

  if ($(this).hasClass("down")) {
    $('.re-search').animate({
      "bottom": "-3rem"
    });
    $('.re-search__bar').animate({
      "opacity": "1"
    });
    $(this).addClass("up").removeClass("down");
  } else {
    $('.re-search').animate({
      "bottom": "-50rem"
    });
    $('.re-search__bar').animate({
      "opacity": "0"
    });
    $(this).addClass("down").removeClass("up");
  }
})

//re-search

const db = firebase.firestore();
const docRefSearch = db.doc("searchValue/value");
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const searchButton = document.querySelector('#searchButton');

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
      window.location.href = '../pages/board.html';
    }).catch(function (error) {
      console.log("error:", error)
    });
  } else {
    errorScreen.innerHTML = "잠깐! 여행지만이라도 알려주세요.";
    smallPopUpOpener();
  }

});

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

//see kakao profile

var userWithKakaoId;

function getUserData(kakaoId) {

  const docRefForUser = db.collection("users");
  docRefForUser.where("kakaoId", "==", kakaoId).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        userWithKakaoId = doc.data();
        //arrange data
        if (doc.exists) {
          if (userWithKakaoId.kakaoSmallImg !== null) {
            $('.kakao-profile__img').prop("src", userWithKakaoId.kakaoSmallImg);
          } else {
            $('.kakao-profile__img').prop("src", "../img/user-nobody.png");
          }
          $('.kakao-profile__name').html(userWithKakaoId.name);
          $('.kakao-profile__age').html(`, ${userWithKakaoId.age}`);
          $('.kakao-profile__city').html(userWithKakaoId.city);
          $('.kakao-profile__email').html(userWithKakaoId.email);
        }
      });
      //showup

      $('.kakao-profile').css("display", "block");
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);

    });
}



//close profile
function closeProfile() {
  $('.kakao-profile__img').prop("src", "../img/user-nobody.png")
  $('.kakao-profile__name').html("정보가 없습니다.");
  $('.kakao-profile__city').html("");
  $('.kakao-profile__age').html("");
  $('.kakao-profile__email').html("");
  //hideup
  $('.kakao-profile').css("display", "none");
}

$('.kakao-profile__closer').on('click', function () {
  closeProfile();
})