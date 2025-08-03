var buttons = document.querySelectorAll("nav button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var id = this.id.replace("Btn", "");
    var pages = document.querySelectorAll(".page");
    for (var j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
  });
}

function updateCountdown(id, targetDate) {
  var countdownElement = document.getElementById(id);
  var now = new Date();
  var distance = targetDate - now;

  if (distance < 0) {
    countdownElement.textContent = "It's here!";
    return;
  }

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((distance / (1000 * 60)) % 60);
  var seconds = Math.floor((distance / 1000) % 60);

  countdownElement.textContent = days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

function startCountdowns() {
  var summerOlympics = new Date("2028-07-14T00:00:00");
  var winterOlympics = new Date("2026-02-06T00:00:00");

  setInterval(function () {
    updateCountdown("summerCountdown", summerOlympics);
    updateCountdown("winterCountdown", winterOlympics);
  }, 1000);
}

startCountdowns();

function toggleCard(type) {
  var contentId = type + "Content";
  var content = document.getElementById(contentId);
  var audio = new Audio("audio/click.mp3");

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    content.style.opacity = 0;
    content.style.marginTop = 0;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.style.opacity = 1;
    content.style.marginTop = "1rem";
    audio.play();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ancientBtn").addEventListener("click", function () {
    toggleCard("ancient");
  });

  document.getElementById("modernBtn").addEventListener("click", function () {
    toggleCard("modern");
  });
});

/* Game */

var score = 0;
var gameTimer;

function startGame() {
  score = 0;
  document.getElementById("score").textContent = score;
  var gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  var duration = 20000; // 20 seconds
  var interval = setInterval(spawnMedal, 800);

  gameTimer = setTimeout(function () {
    clearInterval(interval);
    alert("Time's up! Your score: " + score);
  }, duration);
}

function spawnMedal() {
  var gameArea = document.getElementById("gameArea");
  var medal = document.createElement("div");
  medal.className = "medal";

  medal.style.top = Math.random() * 260 + "px";
  medal.style.left = Math.random() * 560 + "px";

  medal.onclick = function () {
    score++;
    document.getElementById("score").textContent = score;
    gameArea.removeChild(medal);
  };

  gameArea.appendChild(medal);

  setTimeout(function () {
    if (medal.parentElement) {
      gameArea.removeChild(medal);
    }
  }, 1200);
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startGameBtn").addEventListener("click", startGame);
});

/* Quiz */

var currentQuestion = 0;
var quizScore = 0;

var quizData = [
  {
    question: "1. Where were the 2024 Summer Olympics held?",
    options: ["Tokyo", "Paris", "London"],
    answer: "Paris"
  },
  {
    question: "2. What is the main purpose of the modern Olympics?",
    options: ["Worship ancient gods", "Promote international peace and competition", "Celebrate ancient architecture"],
    answer: "Promote international peace and competition"
  },
  {
    question: "3. Which of the following is a Summer Olympic sport added in 2024?",
    options: ["Breaking", "Curling", "Biathlon"],
    answer: "Breaking"
  },
  {
    question: "4. Why did the Ancient Olympics stop?",
    options: ["A natural disaster destroyed Olympia", "They became too violent", "They were banned during the Christianization of the Roman Empire"],
    answer: "They were banned during the Christianization of the Roman Empire"
  },
  {
    question: "5. How are new sports added to the Olympics?",
    options: ["Public voting", "Decision by the host country and IOC", "Based on social media popularity"],
    answer: "Decision by the host country and IOC"
  }
];

function loadQuestion() {
  var questionElement = document.getElementById("quizQuestion");
  var optionsElement = document.getElementById("quizOptions");
  var nextButton = document.getElementById("nextBtn");

  questionElement.textContent = quizData[currentQuestion].question;
  optionsElement.innerHTML = "";

  quizData[currentQuestion].options.forEach(function (option) {
    var label = document.createElement("label");
    label.style.display = "block";

    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + option));
    optionsElement.appendChild(label);
  });

  nextButton.textContent = currentQuestion === quizData.length - 1 ? "Submit" : "Next";
}

function nextQuestion() {
  var selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (selected.value === quizData[currentQuestion].answer) {
    quizScore++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  var container = document.getElementById("quizContainer");
  container.querySelector("#quizQuestion").textContent = "";
  container.querySelector("#quizOptions").innerHTML = "";
  container.querySelector("#nextBtn").style.display = "none";
  container.querySelector("#restartBtn").style.display = "inline-block";
  container.querySelector("#quizResult").textContent = "You scored " + quizScore + " out of " + quizData.length + "!";
}

function restartQuiz() {
  currentQuestion = 0;
  quizScore = 0;

  document.getElementById("nextBtn").style.display = "inline-block";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("quizResult").textContent = "";

  loadQuestion();
}

window.addEventListener("DOMContentLoaded", function () {
  loadQuestion();

  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("restartBtn").addEventListener("click", restartQuiz);
});