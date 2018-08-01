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
    window.location.replace("./signin.html")
  }
}

//all board
const boardAll = document.querySelector('.boardAll');
boardAll.addEventListener('click', function () {
  window.location.href = './boardall.html';
})

//data upload
const db = firebase.firestore();
const docRef = db.collection("donghang");
const docRefForUser = db.collection("users");
const docRefSearch = db.doc("searchValue/value");
const makeupButton = document.querySelector('#makeupButton');
const inputTextTitle = document.querySelector('#selectedTitle');
const inputTextCity = document.querySelector('#selectedCity');
const inputTextPlace = document.querySelector('#selectedPlace');
const inputTextDate = document.querySelector('#selectedDate');
const inputTextTime = document.querySelector('#selectedTime');
const inputTextHowMany = document.querySelector('#selectedHowMany');
const inputTextKakao = document.querySelector('#selectedKakao');
const inputTextContent = document.querySelector('#selectedContent');


//get kakao Id
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    docRefForUser.where("uid", "==", user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          inputTextKakao.value = doc.data().kakaoId;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
});


makeupButton.addEventListener('click', function () {
  var user = firebase.auth().currentUser;
  var selectedTitle = inputTextTitle.value;
  var selectedCity = inputTextCity.value;
  var selectedPlace = inputTextPlace.value;
  var selectedDate = inputTextDate.value;
  var selectedTIme = inputTextTime.value;
  var selectedHowMany = inputTextHowMany.value;
  var selectedKakao = inputTextKakao.value;
  var selectedContent = inputTextContent.value;


  if (selectedTitle != "" && selectedCity != "" && selectedPlace != "" && selectedDate != "" &&
    selectedTIme != "" && selectedHowMany != "" && selectedKakao != "" && selectedContent != "") {

    var GetNum = selectedDate.match(/\d+/g);
    var selectedDateGetNum = parseInt(GetNum[0] + GetNum[1] + GetNum[2]);

    docRef.add({
      email: user.email,
      title: selectedTitle,
      city: selectedCity,
      place: selectedPlace,
      date: selectedDate,
      dateNum: selectedDateGetNum,
      time: selectedTIme,
      howMany: selectedHowMany,
      kakao: selectedKakao,
      content: selectedContent,
      uid: user.uid
    }).then(function (data) {
      console.log("uploaded data!, data ID :", data.id)
    }).catch(function (error) {
      console.log("error:", error)
    });

    docRefSearch.set({
      selectedPlace: selectedPlace
    }).then(function () {
      window.location.href = './board.html';
    }).catch(function (error) {
      console.log("error:", error)
    });

  } else {
    $('.small-popup').css({
      "opacity": "1",
      "visibility": "visible"
    });
    $('.small-popup__content').animate({
      "right": "2rem"
    }, 300);
  }

});

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

//backButton
$('#backButton').on('click', function () {
  window.location.href = "../index.html"
})

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