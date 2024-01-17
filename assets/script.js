var currentQuestion = 1;
var timeRemaining = 120;
var timerStarted = false;

function nextQuestion() {
    if (!timerStarted) {
        startTimer(); // Start the timer only if it hasn't started yet
        timerStarted = true;
    }

    var currentQuestionSection = document.getElementById('question' + currentQuestion);
    currentQuestionSection.style.display = 'none';
    updateTimer(); // Update the timer for each question

    currentQuestion++;
    var nextQuestionSection = document.getElementById('question' + currentQuestion);

    if (nextQuestionSection) {
        nextQuestionSection.style.display = 'block';
    } else {
        showResults();
        clearInterval(timerInterval); // Stop the timer when all questions are answered
    }
}

function showResults() {
    clearInterval(timerInterval); // Stop the timer
    var resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    var score = calculateScore();
    var scoreElement = document.getElementById('score');
    scoreElement.textContent = 'Your score: ' + score;

    // Allow user to save initials and score
    var initials = prompt('Enter your initials:');
    saveScore(initials, score);
}

function calculateScore() {
    var score = 0;

    var answer1 = document.querySelector('input[name="q1"]:checked');
    if (answer1 && answer1.value === 'a') {
        score++;
    } else {
        // Deduct 10 seconds for wrong answer
        timeRemaining -= 10;
    }
 
 
    var answer2 = document.querySelector('input[name="q2"]:checked');
    if (answer2 && answer2.value === 'b') {
        score++;
    } else {
        timeRemaining -= 7;
    }
    var answer3 = document.querySelector('input[name="q3"]:checked');
    if (answer3 && answer3.value === 'b') {
        score++;
    } else {
        timeRemaining -= 7;
    }
 
 
    var answer4 = document.querySelector('input[name="q4"]:checked');
    if (answer4 && answer4.value === 'c') {
        score++;
    } else {
        timeRemaining -= 7;
    }
 
 
    var answer5 = document.querySelector('input[name="q5"]:checked');
    if (answer5 && answer5.value === 'a') {
        score++;
    } else {
        timeRemaining -= 7;
    }
 
    // Add points based on time remaining
    score += Math.floor(timeRemaining / 10);

    return score + Math.max(0, Math.floor(timeRemaining / 10));
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

var timerInterval;

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

function resetQuiz() {
    currentQuestion = 1;
    timeRemaining = 120;
    timerStarted = false;

    // Hide all questions and results
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

   
    var firstQuestionDiv = document.getElementById('question1');
    if (firstQuestionDiv) {
        firstQuestionDiv.style.display = 'block';
    }

    startTimer();
}

document.addEventListener('DOMContentLoaded', function () {
    resetQuiz(); 
});

function saveScore() {
    var initialsInput = document.getElementById('initials');
    var initials = initialsInput.value.trim();
  
    if (initials !== '') {
      var score = calculateScore();
      var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      highScores.push({ initials: initials, score: score });
      localStorage.setItem('highScores', JSON.stringify(highScores));
  
      loadHighScores(); 
    }
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

document.addEventListener('DOMContentLoaded', function () {
    resetQuiz();
    loadHighScores(); // Load high scores when the page is loaded
  });