//Global lobal variables
var currentQuestion = 0;
var timeLeft = 0;

//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{title: "What color was Tweety?",
    choices: ["black", "orange", "yellow"],
    answer: "yellow"},

    {title: "What was the name of the character that chased the Road Runner?",
    choices: ["Daffy Duck", "Sylvester", "Wile E Cayote"],
    answer: "Wile E Cayote "},

    {title: " Who was the first ever Looney Too?",
    choices: ["Elmer Fudd", "Sylvester", "Bosko", "None of the above."],
    answer: "Bosko"},

    {title: "In what year was Bugs Bunny born?",
    choices: ["1940", "1941", "1937" ],
    answer: "1940"},]; 


//function to start the timer
function start() {
    timeLeft = 25;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        end(); 
    }
}, 1000);

    next();
};

//Stops timer
function end() {
    clearInterval(timer);

let quizContent =   `<h3>Game Over</h3>
                    <p>Your score was: ` + timeLeft +  ` % out of 100, read up more </br>about Looney Toons and come back to try again. </p>
                    <input id="initials" placeholder="Initials"></br>
                    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
};

//Local storage score
function setScore() {
    localStorage.setItem("topScore", timeLeft);
    localStorage.setItem("topScoreInt",  document.getElementById('initials').value);
    
    getScore();
};

function getScore() {
let quizContent = `<h2>` + localStorage.getItem("topScoreInt") + `'s topScore is:</h2>
                    <h1>` + localStorage.getItem("topScore") + `</h1><br> 
                    <button onclick="clearScore()">Clear</button></br><button onclick="tryAgain()">Try Again</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
};


//Clear score from localStorage
function clearScore() {
    localStorage.setItem("topScore", "");
    localStorage.setItem("topScoreInt",  "");

    tryAgain();
};

//reset the game 
function tryAgain() {
    clearInterval(timer);
    
document.getElementById("timeLeft").innerHTML = timeLeft;

let quizContent =   `<h2> Looney Toon's</h2>
                    <h3>How much do you know?</h3>
                    <button onclick="start()"> Click to Start</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
};

//Score deduction for incorrect
function incorrect() {
    timeLeft -= 10; 
    next();
};

//Score increased for correct
function correct() {
    timeLeft += 10;
    next();
};

//Questions
function next() { 
    currentQuestion++;

if (currentQuestion > questions.length - 1) {
    end();
    return;
};

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

var buttonCode = 0;



for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    let buttonCode = "<button onclick=\"[selection]\">[option]</button>"; 
    buttonCode = buttonCode.replace("[option]", questions[currentQuestion].choices[i]);

    if (questions[currentQuestion].choices[i] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[selection]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[selection]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
};