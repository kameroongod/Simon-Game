// Starting parameters of the game
var cliqued = 0;
var level = 1;
var sounds = ["blue","green", "red", "yellow"];
var chosenSound = [];

// Function that gets called on any key being pressed down, will trigger the function that generates the sequence at level 1
$(document).on("keydown", function() {    
    level = 1;
    chosenSound = [];
    setTimeout(function() {
        chosenSound = play_sound(level);
    }
    ,1000);
})

// Function that generates the sequence of sounds to repeat based on the level the player is currently at
function play_sound(level) {
    $("h1").text("Level " + level);
    cliqued = 0;

    for (i=0; i<level;i++){
        var sound_number = Math.floor(Math.random() * sounds.length);
        var sound = sounds[sound_number];
        // So that only last color added in sequence gets played with sound and animation
        if (i+1 === level){
            var audio_file = new Audio("sounds/" + sound + ".mp3");
            var square = $("." + sound);
            audio_file.play();
            square.fadeOut().fadeIn();
            chosenSound.push(sound);
        }
    }   

    console.log(chosenSound); //just for testing (but cheatcode if you read the code haha)
    return chosenSound;
}

// Function that logs the button being clicked on and verifies it with the random sequence
$("#grid-game div").click(function (event){
    var chosen_button = event.target.classList[0];
    check_cliqued(cliqued, chosen_button, chosenSound);
    cliqued++;
    console.log(cliqued); //for testing
})

// Function that checks the currently clicked button and compares against position in sequence
function check_cliqued(cliqued, chosen_button, chosenSound){
    var square = $("." + chosen_button);
    if (chosen_button === chosenSound[cliqued]){
        var audio_file = new Audio("sounds/" + chosen_button + ".mp3");
        square.addClass("pressed");
        audio_file.play();
        square.fadeOut().fadeIn();
        setTimeout(function() {
            square.removeClass("pressed");
        },500)

        // If the next of click is equal to sequence length, start the next sequence because indexing the sequence starts from 0 so you add 1 to compare with number
        if ((cliqued + 1 ) === chosenSound.length){
            setTimeout(function() {
            level++;
            chosenSound = play_sound(level);
            },2000)
        }
    }

    else {
            var audio_file = new Audio("sounds/wrong.mp3");
            audio_file.play();
            $("h1").text("Game over, press any key to restart");
            $("body").addClass("fail");
            setTimeout(function() {
                $("body").removeClass("fail");
            },300)
    }
}