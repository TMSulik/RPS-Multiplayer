var config = {
  apiKey: "AIzaSyAGTeTITOTPaojdePzri_n_ZH1KHMfLz0k",
  authDomain: "rps-multiplayer-6a299.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-6a299.firebaseio.com",
  projectId: "rps-multiplayer-6a299",
  storageBucket: "",
  messagingSenderId: "71764649933"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

var playerOne = "Player One";
var playerTwo = "Player Two";
var choice1 = "Waiting for " + playerOne;
var choice2 = "Waiting for " + playerTwo;
var outcome = "Make your choice!";
$('.outcome').text(outcome);

$("#p1Button").on("click", function(event) {
  if($("#player-one-name").val() === "") {
    alert("Type your name in the field");
    return;
  }
  playerOne = $("#player-one-name").val().trim();
  $("#p1").text(playerOne);
  $('#player-one-name').val('');
  $("#logout1").text(playerOne + " sign-out");
  disableSignin('#signIn1', '#logout1');
  updateDatabase();
});

$("#p2Button").on("click", function(event) {
  event.preventDefault();
  if($("#player-two-name").val() === "") {
    alert("Type your name in the field");
    return;
  }
  playerTwo = $("#player-two-name").val().trim();
  database.ref().set({
    playerOne: playerOne,
    playerTwo: playerTwo
  });
  $("#p2").text(playerTwo);
  $("#player-two-name").val('');
  $("#logout2").text(playerTwo + " sign-out");
  disableSignin('#signIn2', '#logout2');
  updateDatabase();
});

function disableSignin(player, logout) {
  $(player).hide();
  $(logout).show();
}

$("#logout1").on("click", function(event) {
  $('.outcome').text(playerOne + " has left the game");
  playerOne = "Player One";
  $("#p1").text(playerOne);
  $("#signIn1").show();
  $("#logout1").hide();
  updateDatabase();
  countdownToNewRound();
});

$("#logout2").on("click", function(event) {
  $('.outcome').text(playerTwo + " has left the game");
  playerTwo = "Player Two";
  $("#p2").text(playerTwo);
  $("#signIn2").show();
  $("#logout2").hide();
  updateDatabase();
  countdownToNewRound();
});

function updateDatabase() {
  event.preventDefault();
  database.ref().set({
    playerOne: playerOne,
    playerTwo: playerTwo
  });
}

var user = firebase.auth().signInAnonymously();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    var isAnonymous = user.isAnonymous;
    console.log(isAnonymous + " is signed in");
    user_id = user.uid;
  } else {
    // User is signed out.
    console.log("User is signed out");
  }
});

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("value", function(snapshot) {
  console.log("Snapshot: " + snapshot);
  if(true) {
  console.log("Snapshot: " + snapshot);

  // If Firebase has a highPrice and highBidder stored (first case)
  // if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    // highPrice = ...
    // highBidder = ...


    // Change the HTML to reflect the stored values


    // Print the data to the console.

  } else {
    // Change the HTML to reflect the initial values
    // Print the data to the console
  }

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$('button').click(function(){
  var fired_button = $(this).val();
  var button_owner = $(this).parent().attr("class");
  if(button_owner === "player-1") {
    choice1 = fired_button;
    if(choice2 === ("Waiting for " + playerTwo)) {
      $('.outcome').text(choice2);
    } else {
      announceOutcomes();
    }
  } 
  if(button_owner === "player-2") {
    choice2 = fired_button;
    if(choice1 === ("Waiting for " + playerOne)) {
      $('.outcome').text(choice1);
    } else {
      announceOutcomes();
    }
  } 
});
// Insert a linebreak in the element's text.
$.fn.multiline = function(text){
  this.text(text);
  this.html(this.html().replace(/\n/g,'<br/>'));
  return this;
}

function announceOutcomes() {
  if(choice1 === choice2) {
    $('.outcome').multiline(playerOne + "'s " + choice1 + " matches " + playerTwo + "'s " + choice2 + ". \n It's a tie!");
    // Prevent players from changing results
    $('button').attr("disabled", true);
    countdownToNewRound();
  }
  if(choice1 === "rock") {
    if(choice2 === "scissors") {
      $('.outcome').multiline(playerOne + "'s " + choice1 + " crushes " + playerTwo + "'s " + choice2 + ". \n" + playerOne + " wins!");
    }
    if(choice2 === "paper") {
      $('.outcome').multiline(playerTwo + "'s " + choice2 + " covers " + playerOne + "'s " + choice1 + ". \n" + playerTwo + " wins!");
    }
  }
  if(choice1 === "paper") {
    if(choice2 === "rock") {
      $('.outcome').multiline(playerOne + "'s " + choice1 + " covers " + playerTwo + "'s " + choice2 + ". \n" + playerOne + " wins!");
    }
    if(choice2 === "scissors") {
      $('.outcome').multiline(playerTwo + "'s " + choice2 + " cut " + playerOne + "'s " + choice1 + ". \n" + playerTwo + " wins!");
    }
  }
  if(choice1 === "scissors") {
    if(choice2 === "paper") {
      $('.outcome').multiline(playerOne + "'s " + choice1 + " cut " + playerTwo + "'s " + choice2 + ". \n" + playerOne + " wins!");
    }
    if(choice2 === "rock") {
      $('.outcome').multiline(playerTwo + "'s " + choice2 + " crushes " + playerOne + "'s " + choice1 + ". \n" + playerTwo + " wins!");
    }
  }
  // Prevent players from changing results
  $('button').attr("disabled", true);
  countdownToNewRound();
}

function resetGame() {
  $('button').attr("disabled", false);
  choice1 = "Waiting for " + playerOne;
  choice2 = "Waiting for " + playerTwo;
  outcome = "Make your choice!";
  $('.outcome').text(outcome);
}

function countdownToNewRound() {
  var counter = 3;
  var interval = setInterval(function() {
    counter--;
    if (counter == 0) {
      resetGame();
    }
  }, 1000);
}

$( document ).ready(function() {
  $("#p1").text(playerOne);
  $("#p2").text(playerTwo);
  $("#logout1").hide();
  $("#logout2").hide();
  $("#signIn1").show();
  $("#signIn2").show();

  database.ref().set({
    playerOne: "Player One",
    playerTwo: "Player Two"
  });
});
