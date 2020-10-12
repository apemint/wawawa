

function showHighScore() {
   

    //var name = prompt("Please enter your name");
  
    var high_scores = localStorage.getItem("scores");
  
    if (!high_scores) {
      high_scores = [];
    } else {
      high_scores = JSON.parse(high_scores);
    }
  
  //  high_scores.push({ name: name, score: correctCount });
  
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
  
    document.getElementById("scores").appendChild(contentUL);
  }

  showHighScore();