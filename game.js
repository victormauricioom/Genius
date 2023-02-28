var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var soundR = new Audio("sounds/red.mp3");
var soundG = new Audio("sounds/green.mp3");
var soundB = new Audio("sounds/blue.mp3");
var soundY = new Audio("sounds/yellow.mp3");
var soundWrong = new Audio("sounds/wrong.mp3");
var i = 0;
var a = 0;
var cor;

//Define a próxima cor do jogo

function nextColor() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
}


//Cria a próxima sequência do jogo

function nextSequence () {
    $("h1").text("Level "+(gamePattern.length))
    var tempo = 500;
    if (i!=0) {
        tempo = 500;
    }
    cor = gamePattern[i];
    setTimeout (function () {
        flashColour();
        i++;
        if (i < gamePattern.length) {
            nextSequence();
            // console.log("if");
        };
    }, tempo);
}

//Começa o jogo com keypress

$(document).keypress(function() {
    console.log("Keyboard Start");
    userClickedPattern = [];
    newRound();
});

//Pisca a cor

function flashColour() {
    $("."+cor).fadeOut(75).fadeIn(75);
        switch (cor) {
            case "red": soundR.play();
            break;
            case "green": soundG.play();
            break;
            case "blue": soundB.play();
            break;
            case "yellow": soundY.play();
            break;
    }   
}

//Pisca a cor clicada pelo usuário e inicia a checagem

$(".btn").on("click", function() {
    
    if ($(this).hasClass("red")) {
        cor = "red";
        flashColour();
        userClickedPattern.push("red");
    }
    if ($(this).hasClass("green")) {
        cor = "green";
        flashColour();
        userClickedPattern.push("green");
    }
    if ($(this).hasClass("blue")) {
        cor = "blue";
        flashColour();
        userClickedPattern.push("blue");
    }
    if ($(this).hasClass("yellow")) {
        cor = "yellow";
        flashColour();
        userClickedPattern.push("yellow");
    }
    console.log("Clicados: "+ userClickedPattern +"\nJogo: "+gamePattern);
    checkAnswer();
    a++;
});

//Checa se a sequência está batendo com o jogo

function checkAnswer () {
    var game = gamePattern[a];
    var user = userClickedPattern[a];
    if (game === user) {
        console.log("*Acertou");
        if (a == (i-1)) { //Se jogador acertar tudo, pisca verde e recomeça
            a = -1;
            userClickedPattern = [];

            setTimeout(function() {
                $("body").css("background-color", "green")}
                ,300);
                
            setTimeout(function() {
                $("body").css("background-color", "#011F3F")}
                ,450);
            setTimeout(newRound, 1000);
        }
    }
    else { //Se jogador errar, diz game over
        console.log("*Errou");
        $("h1").text("Game Over");
        setTimeout(function() {
            $("body").css("background-color", "red")
            soundWrong.play();}
            ,300);
        setTimeout(function () {location.reload()}, 2300);
    }
}

//Cria uma nova rodada

function newRound () {
    console.log("Rodada "+(gamePattern.length+1));
    i = 0;
    nextColor();
    nextSequence();
}