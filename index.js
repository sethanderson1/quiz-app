const STORE = {
  currentQuestion: 0,
  answeredCorrectly: 0,
  totalQuestions: 5,
  // **remember to set this to false
  quizStarted: false,

  questions: [
    {
      question:
        "Which of the following is true about the Double-crested cormorant?",
      answers: [
        "It can dive up to 25 ft deep",
        "It’s feathers are not waterproof",
        "It almost never makes a sound",
        "None of the above",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswer: "All of the above"
    },

    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswer: "All of the above"
    },
    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswer: "All of the above"
    },
    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswer: "All of the above"
    }
  ]
};

const QUESTION_BOX = $(".js-question-and-answers");
// const currQuestion = STORE.questions[STORE.currentQuestion];

function handleQuestionNumber() {
  // determine what the current
  // question number is
  // const currQuestion = STORE.questions[STORE.currentQuestion];
  $(".js-question-number-and-score")
    .html(`<span>Question: ${STORE.currentQuestion}/${STORE.totalQuestions}</span>
    <span>Score: ${STORE.answeredCorrectly}/${STORE.totalQuestions}</span>`);
}

function handleWelcome() {
  // render welcome screen
  QUESTION_BOX.html(
    `    
    <h2>Welcome!</h2>
        <p>How much do you know about Sonoran Desert birds?</p>
        <div class="js-question-image">
        <img src='images/roadrunner_head.jpg'</div>
        <button>Start Quiz!</button>
        `
  );
  QUESTION_BOX.addClass("js-welcome");
  QUESTION_BOX.on("click", "button", function(event) {
    console.log("start quiz button works");
    showQuestionBox();
    QUESTION_BOX.removeClass("js-welcome");
  });
}

function showQuestionBox() {
  const answers = STORE.questions[STORE.currentQuestion].answers
    .map(
      (el,i) => `<input type="radio" id="option${i}" name="options" value="${i}"></input>
             <label for="option${i}">${el}</label><br>`
    )
    .join("");

  QUESTION_BOX.html(
    `<form id="js-questions">
    <fieldset>
    <legend>${STORE.questions[STORE.currentQuestion].question}</legend>
    <div><img src='images/doublecrestedcormorant.jpg'></div>
    ${answers}
    <button type="submit" class="js-next-button">Submit</button>
    </fieldset>
    </form>  
   
    `
  );

}

function updateQuestionNumber() {
  STORE.currentQuestion += 1;
}

function updateScore(userAnswer) {
  const correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  console.log("useranswer is" + userAnswer);
  const isCorrect = userAnswer === correctAnswer;
  if (isCorrect == true) {
    STORE.answeredCorrectly += 1;
  }
  console.log("update score worked" + STORE.answeredCorrectly);
}

function handleClickNext() {
  QUESTION_BOX.on("click", "#js-questions", function(event) {
    event.preventDefault();
    const userAnswer = $('#js-questions input:checked').val();
    // updateScore(userAnswer);
    console.log(userAnswer);
    console.log("js next button clicked");
  });
//   handleQuestionNumber();
  //   showQuestionBox();
}

function handleQuestionBox() {
  if (STORE.quizStarted == false) {
    handleWelcome();
  } else {
    showQuestionBox();
  }
}

function makeQuiz() {
  handleQuestionBox();
  handleClickNext();
}

$(makeQuiz);
console.log(STORE.currentQuestion);
