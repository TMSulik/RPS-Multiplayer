
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

var CHOICES = {
  p1: "rock",
  p2: "rock"
}

var playerOne = "Laurel";
var playerTwo = "Hardy";

$('button').click(function(){
  
  var fired_button = $(this).val();
  var button_owner = $(this).parent().attr("class");
  if(button_owner === "player-1") {
    button_owner = playerOne;
  } else {
    button_owner = playerTwo;
  }
  $('.outcome').text(button_owner + " clicked " + fired_button);

});

// TODO: When a pair of player's login, assign one to player1, the other to player2
// Something like:
// If no one is signed in, the first person to sign in is player1.
// If one user is signed in, that person is player2
// var user = [person signed in on this device]
// function disableOpponentsButtons() {
//   if(user === player1) {
//     // I think this will disable buttons in that div class
//     // If not, disable buttons individually by their id
//     $('.player-1').prop('disabled', false);
//     $('.player-2').prop('disabled', true);
//   } else {
//     $('.player-2').prop('disabled', false);
//     $('.player-1').prop('disabled', true);
//   }
// }



$( document ).ready(function() {
  $("#p1").text(playerOne);
  $("#p2").text(playerTwo);
});




// Creates an array that lists out all of the options (Rock, Paper, or Scissors).
var computerChoices = ["r", "p", "s"];

// Creating variables to hold the number of wins, losses, and ties. They start at 0.
var wins = 0;
var losses = 0;
var ties = 0;

// Create variables that hold references to the places in the HTML where we want to display things.
var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var computerChoiceText = document.getElementById("computerchoice-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var tiesText = document.getElementById("ties-text");

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

// Determines which key was pressed.
var userGuess = event.key;

// Randomly chooses a choice from the options array. This is the Computer's guess.
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

// Reworked our code from last step to use "else if" instead of lots of if statements.

// This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

  if ((userGuess === "r" && computerGuess === "s") ||
      (userGuess === "s" && computerGuess === "p") || 
      (userGuess === "p" && computerGuess === "r")) {
        wins++;
      } else if (userGuess === computerGuess) {
        ties++;
      } else {
        losses++;
      }
      
  // Hide the directions
  directionsText.textContent = "";

  // Display the user and computer guesses, and wins/losses/ties.
  userChoiceText.textContent = "You chose: " + userGuess;
  computerChoiceText.textContent = "The computer chose: " + computerGuess;
  winsText.textContent = "wins: " + wins;
  lossesText.textContent = "losses: " + losses;
  tiesText.textContent = "ties: " + ties;
  }
};
