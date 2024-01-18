var currentQuestion = 1;
var timeRemaining = 60;
var score = 0;
var timerStarted = false;
var timerInterval;

function calculateScore() {
    // Score based on time remaining
    var finalScore = Math.max(0, Math.floor(timeRemaining / 10));
    return finalScore;
}

function showResults() {
    clearInterval(timerInterval);
    var resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    var finalScore = calculateScore();
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Your score: ' + finalScore;

    // Prompt user to save initials and score
    var initials = prompt('Enter your initials:');
    saveScore(initials, finalScore);
    loadHighScores();
    // Display initials and score on the page
    var initialsAndScoreElement = document.getElementById('initialsAndScore');
    initialsAndScoreElement.textContent = 'Score: ' + initials + ' ' + finalScore;
}

function loadHighScores() {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    displayHighScores(highScores);
}

function displayHighScores(scores) {
    var highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';

    scores.forEach(score => {
        var listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(listItem);
    });
}

function nextQuestion() {
    // Check the answer for the current question
    var answer = document.querySelector('input[name="q' + currentQuestion + '"]:checked');
    if (answer && answer.value === 'a') {
        score++;
    } else {
        // Deduct 10 seconds for the wrong answer
        timeRemaining -= 10;
    }

    var currentQuestionSection = document.getElementById('question' + currentQuestion);
    currentQuestionSection.style.display = 'none';

    currentQuestion++;
    var nextQuestionSection = document.getElementById('question' + currentQuestion);

    if (nextQuestionSection) {
        nextQuestionSection.style.display = 'block';
        updateTimer(); // Update the timer for each new question
    } else {
        showResults();
    }
}

function resetQuiz() {
    currentQuestion = 1;
    timeRemaining = 60;
    score = 0;
    timerStarted = false;

    for (var i = 1; i <= 5; i++) {
        var questionSection = document.getElementById('question' + i);
        if (questionSection) {
            questionSection.style.display = 'none';
        }
    }

    var resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        resultsDiv.style.display = 'none';
    }

    var firstQuestionSection = document.getElementById('question1');
    if (firstQuestionSection) {
        firstQuestionSection.style.display = 'block';
    }

    startTimer();
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    var timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = 'Time Remaining: ' + formatTime(timeRemaining);

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showResults();
        } else {
            timeRemaining--;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    resetQuiz();

    // Automatically moves to the next question after answering
    document.querySelectorAll('.question input[type="radio"]').forEach(function (radio) {
        radio.addEventListener('change', nextQuestion);
    });
});

function saveScore(initials, finalScore) {
    console.log('Saving score:', initials, finalScore);
}
