//firebase 시작
var config = {
  apiKey: "AIzaSyCeLl26fWdo1aNtqsU3JPpyxFE4L9LQEmY",
  authDomain: "honghang-7ba3f.firebaseapp.com",
  databaseURL: "https://honghang-7ba3f.firebaseio.com",
  projectId: "honghang-7ba3f",
  storageBucket: "",
  messagingSenderId: "646058881599"
};
firebase.initializeApp(config);

//상태체크

function stateCheck() {
  let onState = "on"
  document.querySelector('.state-signin').style.display = "block";
  document.querySelector('.state-signout').style.display = "none";
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.querySelector('.state-signout').style.display = "block";
      document.querySelector('.state-signin').style.display = "none";
    } else {
      document.querySelector('.state-signout').style.display = "none";
      document.querySelector('.state-signin').style.display = "block";
    }
    return onState;
  })
}
stateCheck();

//로그아웃
function signout() {
  firebase.auth().signOut().then(function () {
    window.location.replace("../index.html");
  });
}

function signoutMain() {
  firebase.auth().signOut().then(function () {
    window.location.replace("./index.html");
  });
}