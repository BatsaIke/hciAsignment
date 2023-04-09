const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#idNum');
const inputDiv = document.getElementById("input-div");
const quizStart = document.getElementById("h5");
const userName = document.getElementById("user-name");
const userID = document.getElementById("user-id");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 60; // or any other starting value
let timerInterval,countdown = null,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  let timerStarted = false;
  function startTimer(duration, display) {
    if (!timerStarted) {
      let timer = duration,
        minutes,
        seconds;
      countdown = setInterval(function () { // assign the interval to countdown
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0 ) {
          clearInterval(countdown);
          display.textContent = "Time's up!";
          startButton.disabled = true;
          yourScore.textContent = "Your final score is";
          quizStart.textContent ="Quiz has ended"
          totalMarks = marks
          finalMarks= 10
          // Create a new pie chart
          new Chart(ctx, {
            type: "pie",
            data: {
              labels: ["Actual Score", "Your Score"],
              datasets: [
                {
                  label: "Marks",
                  data: [finalMarks, totalMarks],
                  backgroundColor: ['#1f1f1f', "#dedede"],
                },
              ],
            },
          });
  
          timerStarted = false; // set timerStarted to false when quiz ends
        }
        if (startButton.innerText === "Restart") { // check if the text content is "Restart"
          clearInterval(countdown); // stop the countdown interval
          timerStarted = false; // set timerStarted to false
        }
      }, 1000);
  
      timerStarted = true;
    }
  }
  
  

startButton.addEventListener("click", function() {
  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    quizStart.textContent='Enter your name and ID.'
    return;
  }
  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});





function startQuiz() {
  countdown = null;
  quizStart.textContent='Quiz started...'
nameField.style.display = 'none';
idField.style.display = 'none';
userName.textContent= `Name:${nameField.value}`
userID.textContent= `ID:${idField.value}`
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    clearInterval(countdown); // stop the countdown interval
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
  
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Why did the tomato turn red?",
    answers: [
      { text: "Because it saw the salad dressing!", correct: true },
      { text: "For the love on the game", correct: false },
    ],
  },
  {
    question: 'Why did the cookie go to the doctor?',
    answers: [
      { text: "James Bond stole it", correct: false },
      { text: "Because it felt crumbly!", correct: true },
      { text: "Neymar  had an injury.", correct: false },
      { text: "Batsa Isaac dint design well", correct: false },
    ],
  },
  {
    question: "What do you call a boomerang that doesn't come back?",
    answers: [
      { text: "A stick!", correct: true },
      { text: "A book", correct: false },
      { text: "Giggie.", correct: false },
      { text: "Groom", correct: false },
    ],
  },
  {
    question: "Why don't scientists trust atoms?",
    answers: [
      { text: "Atom is Atomic", correct: false },
      { text: "Neuton Died because of Atom", correct: false },
      { text: "Because they make up everything!.", correct: true },
      { text: "Frances Ban Koba left", correct: false },
    ],
  },
  {
    question: 'Bill Gates left school and became a billionaire, i left school i became"?',
    answers: [
      { text: "A whatsapp Manager", correct: false },
      { text: "millionaire", correct: false },
      { text: "Teacher", correct: false },
      { text: " Trotro mate", correct: true },
    ],
  },
  {
    question: "Who was the first person to walk on the moon?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Kofi Brymo", correct: false },
      { text: "Neil Armstrong.", correct: true },
      { text: "Elon Musk", correct: false },
    ],
  },
  {
    question: "Why did the banana go to the doctor?",
    answers: [
      { text: "Because it wasn't peeling well!", correct: true },
      { text: "Elinam ate it", correct: false },
    ],
  },
  {
    question: "Why don't skeletons fight each other?",
    answers: [
      { text: "They don't have the guts!", correct: true },
      { text: "They are scared of each other", correct: false },
    ],
  },
  {
    question: "Why did the frog call his insurance company?",
    answers: [
      { text: "He had a jump in his car!", correct: true },
      { text: "Kofi Anan Steped on it", correct: false },
    ],
  },
  {
    question: "What is the capital city of Togo?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
      { text: "Lome", correct: true },
    ],
  },
];
