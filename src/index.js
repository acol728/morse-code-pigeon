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
    " ": "space"
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
    } catch (err) {
        result = "Error: invalid character. " + err;
    }
    return result;
}

// const translateMorseToEnglish = (input) => {
//     let result = "";
//     let morseArray = [];
//     let currentChar = "";
//     try {
//         input.toString().split("", input.length).forEach(function (element) {
//             if (element == "." || element == "-") {
//                 currentChar += element;
//             } else if (element == " ") {
//                 morseArray.push(currentChar);
//                 currentChar = "";
//             } else if (element == "/") {
//                 morseArray.push("space");
//                 currentChar = "";
//             } else {
//                 throw "Character is not morse/does not follow input guide";
//             }
//         });
//         morseArray.push(currentChar);
//     } catch (err) {
//         result = "Error: invalid character. " + err;
//     }
//     morseArray.forEach(function (element) {
//         let newElement = "";
//         for (let i = 0; i < element.length; i++) {
//             if (element[i] !== " " && element[i] !== "/") {
//                 newElement += element.toString().charAt(i) + " ";
//             } else if (element[i] === "/") {
//                 newElement += " ";
//             }
//         }
//         result += Object.keys(morseCode).find(key => morseCode[key] === newElement);
//     });
//     return result;
// }

const greenGame = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const yellowGame = ["hello", "test", "cat", "dog", "what", "soda", "pizza", "game", "morse", "code", "candy", "water", "sun", "sand", "beach"];
const redGame = ["hello world", "morse code pigeon", "this is fun", "how are you", "i like food", "look for it", "it is summer", "common letters"];

function changeState(state) {
    var states = document.getElementsByClassName("state")
    for (var i = 0; i < states.length; i++) {
        document.getElementById(states[i].id).style.display = "none";
    }
    document.getElementById(state).style.display = "block";
}


function addText(message) {
    var soloMessage = document.getElementById("message");
    var messages = document.getElementsByClassName("chatlogs");
    var sent = "<p class='chat-message'>" + message + "</p>";

    var style = "<div class='chat self'>" + sent + "</div>"

    $(".chatlogs").append(style);
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

document.getElementById("Sender").addEventListener("click", function () { addText(document.getElementById("message").value) })

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