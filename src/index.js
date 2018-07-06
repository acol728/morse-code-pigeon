let soundOn = true;

const morseCode = {
    "zero": "-----",
    "one": ".----",
    "two": "..---",
    "three": "...--",
    "four": "....-",
    "five": ".....",
    "six": "-....",
    "seven": "--...",
    "eight": "---..",
    "nine": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-",
    "": "space",
    " ": "/"
}

const numberHelper = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const translateEnglishToMorse = (input) => {
    let result = "";

    try {
        input.toLowerCase().split("", input.length).forEach(function (element) {
            if (morseCode[element]) {
                result += morseCode[element] + " ";
            } else if (element === " ") {
                result += "        ";
            } else if (numberHelper[element]) {
                result += morseCode[numberHelper[element]] + "   ";
            } else {
                throw "Character is not translatable to Morse Code";
            }
            var resultArray = result.trim().split("");
          if(soundOn){
            for (var i = 0; i < resultArray.length; i++) {
                (function (i) {

                    window.setTimeout(function () {
                        sound(resultArray[i]);
                    }, i * 300);

                }(i));

            }
          }
        });

    } catch (err) {
        result = "Error: invalid character. " + err;
    }
    return result;
}


function sound(element) {

    var audio = new Audio('../assets/Morse_Dot.wav');
    var newAudio = new Audio('../assets/Morse_Dash.wav');

    if (element === ".") {
        audio.play();

    } else if (element === "-") {
        newAudio.play();
    }

}

const translateMorseToEnglish = (input) => {
    let result = "";
    var resultArray = input.trim().split("");
    if(soundOn){
    for (var i = 0; i < resultArray.length; i++) {
        (function (i) {

            window.setTimeout(function () {
                sound(resultArray[i]);
            }, i * 300);

        }(i));

    }
    }
    try {

        input.toString().split(" ", input.length).forEach(function (e) {
            result += Object.keys(morseCode).find(key => morseCode[key] === e);
        });

    } catch (err) {
        result = "Error: invalid character. " + err;
    }
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
const chatBot = ["adam is goofy", "Hello there human", "I am sentient", "I can see you", "I am chatBot", "What is Up my Brother!"];


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
        document.getElementById(color + 'AnswerBox').style.backgroundColor = "#44B613";
        document.getElementById(color + 'Score').innerHTML++;
        if (color === "green")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(greenGame[genRan(greenGame.length - 1)]);
        if (color === "yellow")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(yellowGame[genRan(yellowGame.length - 1)]);
        if (color === "red")
            document.getElementById(color + "morse").innerHTML = translateEnglishToMorse(redGame[genRan(redGame.length - 1)]);

        document.getElementById(color + "Input").value = "";
        setTimeout(function () {
            document.getElementById(color + "ResultMessage").innerHTML = "";
            document.getElementById(color + 'AnswerBox').style.backgroundColor = "#D2C8D8";
        }, 750);
    }
    else {
        document.getElementById(color + 'AnswerBox').style.backgroundColor = "#D41616";
        document.getElementById(color + "Input").value = "";
        setTimeout(function () {
            document.getElementById(color + "ResultMessage").innerHTML = "";
            document.getElementById(color + 'AnswerBox').style.backgroundColor = "#D2C8D8";
        }, 750);
    }
}

function handleSound() {
    const obj = document.getElementById("soundIcon");
    if (soundOn) {
        obj.style.backgroundImage = "url('../assets/soundIconOff.png')";
        soundOn = false;
    } else {
        obj.style.backgroundImage = "url('../assets/soundIcon.png')";
        soundOn = true;
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

document.getElementById("soundIcon").addEventListener("click", handleSound);

document.getElementById("message").addEventListener("keypress", function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) {
        addText(document.getElementById("message").value)
    }
});

document.getElementById("green").addEventListener("click", function () { changeState("greenState"); document.getElementById('greenScore').innerHTML = 0; });
document.getElementById("yellow").addEventListener("click", function () { changeState("yellowState"); document.getElementById('yellowScore').innerHTML = 0; });
document.getElementById("red").addEventListener("click", function () { changeState("redState"); document.getElementById('redScore').innerHTML = 0; });

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

