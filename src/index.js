const morseCode = {
    "zero": "- - - - -",
    "one": ".- - - -",
    "two": ". . - - -",
    "three": ". . . - -",
    "four": ". . . . -",
    "five": ". . . . .",
    "six": "- . . . .",
    "seven": "- - . . .",
    "eight": "- - - . .",
    "nine": "- - - - .",
    "a": ". -",
    "b": "- . . .",
    "c": "- . - .",
    "d": "- . .",
    "e": ".",
    "f": ". . - .",
    "g": "- - .",
    "h": ". . . .",
    "i": ". .",
    "j": ". - - -",
    "k": "- . -",
    "l": ". - . .",
    "m": "- -",
    "n": "- .",
    "o": "- - -",
    "p": ". - - .",
    "q": "- - . -",
    "r": ". - .",
    "s": ". . .",
    "t": "-",
    "u": ". . -",
    "v": ". . . -",
    "w": ". - -",
    "x": "- . . -",
    "y": "- . - -",
    "z": "- - . .",
    ".": ". - . - . -",
    ",": "- - . . - -",
    "?": ". . - - . .",
    "!": "- . - . - -",
    "-": "- . . . . -",
    "/": "- . . - .",
    "@": ". - - . - .",
    "(": "- . - - .",
    ")": "- . - - . -"
}

const numberHelper = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const translateEnglishToMorse = (input) => {
    result = '';
    try {
        input.toLowerCase().split("", input.length).forEach(function (element) {
            if (isNaN(element)) {
                result += morseCode[element] + "   ";
            } else {
                if (element === " ") {
                    result += "        ";
                } else {
                    result += morseCode[numberHelper[element]] + "   ";
                }
            }
        });
    } catch (err) {
        result += "Error: invalid characters. " + err;
    }
    return result;
}

const translateMorseToEnglish = (input) => {
    result = '';
    try {
        result = "";
        input.foreach(function (element) {
            result += element + "";
        });
    } catch (err) {
        return "Error: morse code not found for characters";
    }
    return result;
}

function changeState(state) {
    var states = document.getElementsByClassName("state")
    for (var i = 0; i < states.length; i++) {
        document.getElementById(states[i].id).style.display = "none";
    }
    document.getElementById(state).style.display = "block";
}

//EVENT LISTENERS

document.getElementById("learnButton").addEventListener("click", function () { changeState("learnState") });
document.getElementById("translateButton").addEventListener("click", function () { changeState("translateState") });
document.getElementById("messageButton").addEventListener("click", function () { changeState("messageState") });

