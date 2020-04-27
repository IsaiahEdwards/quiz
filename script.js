var questions = [
  {
    question: 'When Michael Jordan played for the Chicago Bulls, how many NBA Championships did he win?',
    answers: [
      { text: '1', correct: false },
      { text: '4', correct: false },
      { text: '7', correct: false },
      { text: '6', correct: true }
    ]
  },
  {
    question: 'Which Jamaican runner is an 11-time world champion and holds the record in the 100 and 200-meter race?',
    answers: [
      { text: 'Usain Bolt', correct: true },
      { text: 'Michael jackson', correct: false },
      { text: 'joakim bank', correct: false },
      { text: 'David Strong', correct: false }
    ]
  }
  ,
  {
    question: 'Which boxer was known as “The Greatest” and “The People’s Champion”?',
    answers: [
      { text: 'Mike Tyson', correct: false },
      { text: 'Floyd Mayweather', correct: false },
      { text: 'Rock Lee', correct: false },
      { text: 'Muhammad Ali', correct: true }
    ]
  }
  ,
  {
    question: 'What is often seen as the smallest unit of memory?',
    answers: [
      { text: 'nanobyte', correct: false },
      { text: 'kilobyte', correct: true },
      { text: 'inch', correct: false },
      { text: 'adamite', correct: false }
    ]
  }
  ,
  {
    question: 'How many soccer players should each team have on the field at the start of each match?',
    answers: [
      { text: '9', correct: false },
      { text: '12', correct: false },
      { text: '8', correct: false },
      { text: '11', correct: true }
    ]
  }
  ,
  {
    question: 'What year was the very first model of the iPhone released?',
    answers: [
      { text: '2009', correct: false },
      { text: '2007', correct: true },
      { text: '2008', correct: false },
      { text: '2011', correct: false}
    ]
  },
]




var startButton = document.getElementById('start-button')
var nextButton = document.getElementById('next-button')
var save = document.getElementById('save')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var shuffledQuestions, currentQuestionIndex
var score = 0;
var highscore = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  clock();
})

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  setNextQuestion()
  score = 0;
  countdown(1);
 clock();
 
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct

    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
    
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')

    
  } else {
    alert("scroll down for highscores");
  //   var username = localStorage.getItem("username");
  // if(!username){
  //     username = prompt("Please enter username");
  //     localStorage.setItem("username", username);
  // }
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element)
  setNextQuestion()
  if (correct) {
    element.classList.add('correct')
    document.getElementById("score").innerText= score++;
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var timeoutHandle;
function countdown(minutes) {
    var seconds = 20;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = "TIME LEFT " +
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {
            if(mins > 1){
               setTimeout(function () { countdown(mins - 1); }, 1000);

 
            }
        }
    }
    tick();
}
function clock() {
  setTimeout(function(){ alert("time is up scroll below to check your high score "); }, 20000);
}

var highscore = localStorage.getItem("highscore");

if (score > parseInt(localStorage.getItem('highscore'), 10)) {
  localStorage.setItem('highscore', score);
}

else{
    localStorage.setItem("highscore", score);
}

document.getElementById("score").innerHTML = localStorage.getItem("highscore");












