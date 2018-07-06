const morseCode = {
    "zero": "- - - - - ",
    "one": ".- - - - ",
    "two": ". . - - - ",
    "three": ". . . - - ",
    "four": ". . . . - ",
    "five": ". . . . . ",
    "six": "- . . . . ",
    "seven": "- - . . . ",
    "eight": "- - - . . ",
    "nine": "- - - - . ",
    "a": ". - ",
    "b": "- . . . ",
    "c": "- . - . ",
    "d": "- . . ",
    "e": ". ",
    "f": ". . - . ",
    "g": "- - . ",
    "h": ". . . . ",
    "i": ". . ",
    "j": ". - - - ",
    "k": "- . - ",
    "l": ". - . . ",
    "m": "- - ",
    "n": "- . ",
    "o": "- - - ",
    "p": ". - - . ",
    "q": "- - . - ",
    "r": ". - . ",
    "s": ". . . ",
    "t": "- ",
    "u": ". . - ",
    "v": ". . . - ",
    "w": ". - - ",
    "x": "- . . - ",
    "y": "- . - - ",
    "z": "- - . . ",
    ".": ". - . - . - ",
    ",": "- - . . - - ",
    "?": ". . - - . . ",
    "!": "- . - . - - ",
    "-": "- . . . . - ",
    "/": "- . . - . ",
    "@": ". - - . - . ",
    "(": "- . - - . ",
    ")": "- . - - . - ",
    "": "space ",
    " ": "/ "
}

const numberHelper = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const translateEnglishToMorse = (input) => {
    let result = "";
    
    try {
        input.toLowerCase().split("", input.length).forEach(function (element) {
            if (morseCode[element]) {
                result += morseCode[element] + "   ";
            } else if (element === " ") {
                result += "        ";
            } else if (numberHelper[element]) {
                result += morseCode[numberHelper[element]] + "   ";
            } else {
                throw "Character is not translatable to morse";
            }
        });
        var resultArray = result.trim().split("");
        
        for(var i = 0; i < resultArray.length; i++){
            (function(i){

                window.setTimeout(function(){
                  sound(resultArray[i]);
                }, i * 250);
            
              }(i));

        }
    } catch (err) {
        result = "Error: invalid character. " + err;
    }
    return result;
}


function sound(element){
    
    var audio = new Audio('../assets/Morse_Dot.wav');
    var newAudio = new Audio('../assets/Morse_Dash.wav');

    if(element === "."){
        audio.play(); 
        
    }else if(element === "-"){
        newAudio.play();  
    }
    
}

const translateMorseToEnglish = (input) => {
    let result = "";
    let morseArray = [];
    let currentChar = "";
    try {
        for (let i = 0; i < input.toString().length; i++) {
            let element = input.toString().charAt(i);
            if (element == "/" && input.toString().charAt(i+1) == " ") {
                morseArray.push("space ");
                i++;
            } else {
                if (element == "." || element == "-") {
                    currentChar += element;
                } else if (element == " ") {
                    morseArray.push(currentChar);
                    currentChar = "";
                } else {
                    throw "Character is not morse/does not follow input guide";
                }
            }
        }
        morseArray.push(currentChar);
    } catch (err) {
        result = "Error: invalid character. " + err;
    }
    morseArray.forEach(function (element) {
        let newElement = "";
        for (let i = 0; i < element.length; i++) {

            if (element[i] !== "s") {
                newElement += element.toString().charAt(i) + " ";
            } else if (element[i] === "s") {
                result += " ";
                newElement += element.toString().substring(i, i + 5) + " ";
                i += 6;
            } else {
                throw "ERROR";
            }
        }
        result += Object.keys(morseCode).find(key => morseCode[key] === newElement);
    });
    return result;
}

function translateText() {
    const input = document.getElementById("translateInput").value;
    let result = "";
    if (input.charAt(0) == "." || input.charAt(0) == "-") {
        try {
            document.getElementById("translateOutput").value = translateMorseToEnglish(input);
        } catch (err) {
            result = "Unable to perform translation";
        }
    } else {
        try {
            document.getElementById("translateOutput").value = translateEnglishToMorse(input);
        } catch (err) {
            result = "Unable to perform translation";
        }
    }
    return result;
}

const greenGame = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const yellowGame = ["hello", "test", "cat", "dog", "what", "soda", "pizza", "game", "morse", "code", "candy", "water", "sun", "sand", "beach"];
const redGame = ["hello world", "morse code pigeon", "this is fun", "how are you", "i like food", "look for it", "it is summer", "common letters"];
const chatBot = ["adam is goofy", "Hello there human", "I am sentient", "I can see you", "I am chatBot", "What is Up Brother!"];


function changeState(state) {
    var states = document.getElementsByClassName("state")
    for (var i = 0; i < states.length; i++) {
        document.getElementById(states[i].id).style.display = "none";
    }
    document.getElementById(state).style.display = "block";
}


function addText(message) {
    var soloMessage = document.getElementById("message");
    var sent = "<p class='chat-message'>" + message + "</p>";
    var style = "<div class='chat self'>" + sent + "</div>"

    $(".chatlogs").append(style);
    var roboMessage = translateEnglishToMorse(chatBot[genRan(chatBot.length - 1)]);
    var roboSent = "<p class='chat-message'>" + roboMessage + "</p>";
    var roboStyle = "<div class='chat friend'>" + roboSent + "</div>"

    $(".chatlogs").append(roboStyle);

    soloMessage.value = "";
}

function genRan(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function gameListener(userInput, color) {
    var morseTranslation = translateEnglishToMorse(userInput).replace(/\s+/g, '');
    var question = document.getElementById(color + "morse").innerHTML.replace(/\s+/g, '');

    if (question == morseTranslation) {
        document.getElementById(color + "ResultMessage").innerHTML = "Correct!";
        document.getElementById(color + 'Score').innerHTML++;
        if (color === "green")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(greenGame[genRan(greenGame.length - 1)]);
        if (color === "yellow")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(yellowGame[genRan(yellowGame.length - 1)]);
        if (color === "red")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(redGame[genRan(redGame.length - 1)]);
        setTimeout(function () { document.getElementById(color + "ResultMessage").innerHTML = "" }, 2000);
    }
    else {
        document.getElementById(color + "ResultMessage").innerHTML = "Wrong!";
        setTimeout(function () { document.getElementById(color + "ResultMessage").innerHTML = "" }, 2000);
    }
}

document.getElementById("initialButton").addEventListener("click", function () { changeState("initialState") });
document.getElementById("learnButton").addEventListener("click", function () { changeState("learnState") });
document.getElementById("translateButton").addEventListener("click", function () { changeState("translateState") });
document.getElementById("messageButton").addEventListener("click", function () { changeState("messageState") });

document.getElementById("subLearnButton").addEventListener("click", function () { changeState("learnState") });
document.getElementById("subTranslateButton").addEventListener("click", function () { changeState("translateState") });
document.getElementById("subMessageButton").addEventListener("click", function () { changeState("messageState") });

document.getElementById("translateInput").addEventListener("keyup", translateText);

document.getElementById("message").addEventListener("keypress", function (e) { 
    var key = e.which || e.keyCode;
    if(key == 13){
    addText(document.getElementById("message").value) }
});

document.getElementById("green").addEventListener("click", function () { changeState("greenState"); });
document.getElementById("yellow").addEventListener("click", function () { changeState("yellowState") });
document.getElementById("red").addEventListener("click", function () { changeState("redState") });

document.getElementById("greenInput").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        gameListener(document.getElementById("greenInput").value, "green")
    }
});

document.getElementById("yellowInput").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        gameListener(document.getElementById("yellowInput").value, "yellow")
    }
});

document.getElementById("redInput").addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        gameListener(document.getElementById("redInput").value, "red")
    }
});

//AUDIO STUFF
// var audio = new Audio('../assets/Morse_Dot.wav');
// audio.play();

//for dash just change dot to dash in file 

