var questions = ["What is the letter e?","What is the letter a?","What is the letter o?"];
var index = 0;
function updateProgressBar() {
    var elem = document.getElementById("progressBar");
    var correct = parseInt(document.getElementById("numberCorrect").innerHTML);
    var progress = 20 * (correct + 1);
    elem.style.width = progress + '%'; 
    document.getElementById("numberCorrect").innerHTML;
    document.getElementById("numberCorrect").innerHTML = correct + 1;

    document.getElementById("question").innerHTML = questions[index];
    index++;
}