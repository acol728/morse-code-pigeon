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

const numTranslation = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

const translateEnglishToMorse = (input) => {
    try {
        result = "";
        input.toLowerCase().split("", input.length).forEach(function (element) {
            try {
                if (element == " ") {
                    result += "        ";
                } else {
                    result += morseCode[element] + "   ";
                }
            } catch (err) {
                for (var value in numTranslation) {
                    console.log(numTranslation[value]);
                }
            }
        });
        return result;
    } catch (err) {
        return "Error: invalid characters" + err;
    }
}

const translateMorseToEnglish = (input) => {
    try {
        result = "";
        input.foreach(function (element) {
            result += element + "";
        });
    } catch (err) {
        return "Error: morse code not found for characters";
    }
}

