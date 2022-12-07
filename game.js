// Variables
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

// Start Game
$(document).keydown(function () {

    if (!started) {
        nextSequence();
        started = true;
        }

})

// Random Pattern Generator
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);

}

// User Pattern Generator
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer(userClickedPattern);
    }

})

// Animation Functions
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// Game Reset
function startOver() {

    gamePattern = [];
    level = 0;
    started = false;

}

// Checking If Arrays Match Before Moving to Next Level or Restart
function checkAnswer(currentLevel) {

    for (let i = 0; i < currentLevel.length; i++) {
        
        if (userClickedPattern[i] === gamePattern[i]) {
            console.log("Success!")
            if (i === currentLevel.length - 1) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong")
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 100);
            $("#level-title").text("Game Over, Press Any Key to Restart")
            return startOver();
        }

    }
    
}