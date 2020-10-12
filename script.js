var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      question:
        "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["<js>", "<scripting>", "<javascript>", "<script>"],
      answer: "<script>"
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      choices: ["the <head> section", "<the <body> section", "after the </html>", "before the <html>"],
      answer: "<the <body> section"
    },
    {
      question: "What is the correct syntax for referring to an external script called \"script.js\"?",
      choices: ["<script src=\"script.js\"", "<script href=\"script.js\"", "<javascript src=\"script.js\"", "<script.js>"],
      answer: "<script src=\"script.js\""
    },
    {
      question: "Which is an accurate example of an IF Statement in JavaScript?",
      choices: ["if i = 5", "if i == 5 then", "if i= 5 then", "if(i == 5){}"],
      answer: "if(i == 5){}"
    },
    {
      question: "Which is an accurate example of the start of a FOR Loop in JavaScript?",
      choices: ["for(i<=5; i++)", "for i=1 to 5", "for(i=0, i<5, i++)", "for(i=0; i<5; i++)"],
      answer: "for(i=0; i<5; i++)"
    },
  ];
  
  var questionEl = document.querySelector("#question");
  var optionListEl = document.querySelector("#option-list");
  var questionResultEl = document.querySelector("#question-result");
  var timerEl = document.querySelector("#timer");
  
  var questionIndex = 0;
  var correctCount = 0;
  var time = questions.length*5; //set time per question
  var intervalId;
  
  function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    //window.open("./scores.html")      //this opens new tab with highscores page idk if i should use this or just have highscore pop up on page instead
    setTimeout(showHighScore, 2);
  }
  
  function showHighScore() {
   

    var name = prompt("Please enter your name");
  
    var high_scores = localStorage.getItem("scores");
  
    if (!high_scores) {
      high_scores = [];
    } else {
      high_scores = JSON.parse(high_scores);
    }
  
    high_scores.push({ name: name, score: correctCount });
  
    localStorage.setItem("scores", JSON.stringify(high_scores));
  
    high_scores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    var contentUL = document.createElement("ul");
  
    for (var i = 0; i < high_scores.length; i++) {
      var contentLI = document.createElement("li");
      contentLI.textContent =
        "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
      contentUL.appendChild(contentLI);
    }
  
    document.body.appendChild(contentUL);
  }
  
  function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
  function renderQuestion() {
    
    if (time == 0) {
      updateTime();
      return;
    }
  
    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;
  
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";
  
    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;
  
    for (var i = 0; i < choicesLenth; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.textContent = choices[i];
      optionListEl.append(questionListItem);
    }
  }
  
  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    renderQuestion();
  }
  
  function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
      var answer = event.target.textContent;
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct";
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect";
        time = time - 2;
        timerEl.textContent = time;
      }
    }
    setTimeout(nextQuestion, 2000);
  }
  
  renderQuestion();
  optionListEl.addEventListener("click", checkAnswer);