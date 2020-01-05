// ** make it so that you have to pick an answer. cants submit otherwise

const STORE = {
  currentQuestionNum: 0,
  answeredCorrectly: 0,
  totalQuestions: 5,
  // **remember to set this to false
  quizStarted: false,

  correctAnsImage: "images/hummingbird.jpg",
  incorrectAnsImage: "images/burrowing_owl.jpg",

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
      correctAnswer: 4,
      image: "images/doublecrestedcormorant.jpg"
    },
    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswer: 2,
      image: "images/roadrunner.jpg"
    },
    {
      question: "The Turkey Vulture’s wingspan can be up to: ",
      answers: ["3 ft", "4 ft", "6 ft", "8 ft"],
      correctAnswer: 2,
      image: "images/turkey_vulture.jpg"
    },
    {
      question:
        "A female Anna’s Humingbird can eat up to how many insects per day?",
      answers: ["100", "500", "1000", "2000"],
      correctAnswer: 3,
      image: "images/hummingbird.jpg"
    },
    {
      question: "A group of Gambel’s quail is known as a: ",
      answers: ["Battery ", "Shake", "Drift", "Flush", "All of the above"],
      correctAnswer: 4,
      image: "images/Gambel's_quail.jpg"
    }
  ]
};

const QUESTION_BOX = $(".js-question-and-answers");
const QUIZ_STATUS = $(".js-question-number-and-score");

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function handleWelcome() {
  //shuffle(STORE.questions)
  // render welcome screen
  QUESTION_BOX.html(
    `<h2>Welcome!</h2>
            <p>How much do you know about Sonoran Desert birds?</p>
            <div class="js-question-image">
            <img src='images/roadrunner_head.jpg'>
            </div>
            <button id="js-start-button">Start Quiz!</button>`
  );
  QUESTION_BOX.addClass("js-welcome");
  QUESTION_BOX.on("click", "#js-start-button", function(event) {
    console.log("start button clicked");
    STORE.quizStarted = true;
    QUESTION_BOX.removeClass("js-welcome");
    renderQuestionBox();
  });
}

function renderQuestionBox() {
    console.log(`renderQuestionBox() invoked`)
  const answers = STORE.questions[STORE.currentQuestionNum].answers
    .map(
      (el, i) =>
        `<input type="radio" id="option${i}" name="options" value="${i}">
             <label for="option${i}">${el}</label><br>`
    )
    .join("");

  QUESTION_BOX.html(
    `<form id="js-questions">
        <fieldset>
          <legend>${STORE.questions[STORE.currentQuestionNum].question}</legend>
          <div><img src="${
            STORE.questions[STORE.currentQuestionNum].image
          }" /></div>
          ${answers}
          <button type="submit" id="js-submit-answer">Submit</button>
        </fieldset>
      </form>`
  );
  console.log(`current question number is ${STORE.currentQuestionNum}`);

  displayQuestionNumberAndScore();

  handleSubmitAnswer();
}

function displayQuestionNumberAndScore() {
  console.log("displayQuestionNumberAndScore() invoked");
  //   console.log(`quiz started is ${STORE.quizStarted}`);
  QUIZ_STATUS.html(`<span>Question: ${STORE.currentQuestionNum + 1}/${
    STORE.totalQuestions
  }</span>
      <span>Score: ${STORE.answeredCorrectly}/${STORE.totalQuestions}</span>`);
}

function updateQuestionNumber() {
    STORE.currentQuestionNum += 1;
}

function handleSubmitAnswer() {
  QUESTION_BOX.on("click", "#js-submit-answer", function(event) {
    console.log("submit answer clicked");
    event.preventDefault();
    console.log(`$("#js-questions input:checked") is ${$("#js-questions input:checked")}`);
    console.log(`$("#js-questions input:checked").val() is ${$("#js-questions input:checked").val()}`);
    updateScore($("#js-questions input:checked").val());
  });
}

function updateScore(userAnswer) {
  const correctAnswer = STORE.questions[STORE.currentQuestionNum].correctAnswer;
  console.log(`correct answer ${correctAnswer} useranswer is ${userAnswer}`);
  const isCorrect = parseInt(userAnswer, 10) === correctAnswer;
  console.log(`at updateScore() isCorrect is ${isCorrect}`);
  if (isCorrect == true) {
    STORE.answeredCorrectly += 1;
  }
  console.log(`update score worked, score is: ${STORE.answeredCorrectly}`);
  if (STORE.currentQuestionNum < STORE.totalQuestions) {
    renderFeedback(isCorrect);
    displayQuestionNumberAndScore();
  }
  if (STORE.quizStarted === true) {
    // displayQuestionNumberAndScore();
  }
}

function renderFeedback(isCorrect) {
  console.log(`renderFeedback invoked`);
  console.log(`current question number is ${STORE.currentQuestionNum}`);
  console.log(`at renderFeedback(), isCorrect is ${isCorrect}`);
  const feedbackImage = isCorrect
    ? STORE.correctAnsImage
    : STORE.incorrectAnsImage;
  // the -1 is so that the feedback reflects the PREVIOUS question
  const correctAns =
    STORE.questions[STORE.currentQuestionNum].answers[
      STORE.questions[STORE.currentQuestionNum].correctAnswer
    ];
  const correctOrNot = isCorrect
    ? `<h3>That\'s Correct!</h3>`
    : `<h3>That\'s Inorrect</h3>`;
  console.log(`correctOrNot is ${correctOrNot}`);
  const correctAnsWas = `The correct answer was : ${correctAns}`;
  QUESTION_BOX.html(
    `<div class="js-correct-or-not">${correctOrNot}</div>
            <div class="js-feedback-image"><img src="${feedbackImage}" /></div>
            <div class="js-correct-ans-was"><h3>${correctAnsWas}</h3></div>
            <button type="submit" class="js-next-question">Next</button>`
  );
  //   displayQuestionNumberAndScore();

  handleClickNext();
}

function handleClickNext() {
  console.log("handleClickNext() was invoked");
  QUESTION_BOX.on("click", ".js-next-question", function(event) {
    console.log(
      `next button clicked, current question number is ${STORE.currentQuestionNum}`
    );
    console.log();
    event.preventDefault();
    // if (STORE.currentQuestionNum-1 < STORE.totalQuestions) {

    // }
    // displayQuestionNumberAndScore();
    updateQuestionNumber()
    // debugger;
  });
  handleQuestionBox();

}

function handleQuestionBox() {
  if (STORE.quizStarted == false) {
    handleWelcome();
    // ** needs -1 or not? check this
    console.log("at handleQuestionBox() : current question is " + STORE.currentQuestionNum);
  } else if (STORE.currentQuestionNum < STORE.totalQuestions) {
    renderQuestionBox();
  } else {
    // handleResults();
  }
}

function makeQuiz() {
  handleQuestionBox();
}

$(makeQuiz);
