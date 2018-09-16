const PubSub = require('../helpers/pub_sub.js');

const QuestionModel = function(questionNumber, quizQuestion) {
  this.questionNumber = questionNumber;
  this.question = quizQuestion.question;
  this.correctAnswer = quizQuestion.correct_answer;

  const allAnswers = quizQuestion.incorrect_answers;
  allAnswers.push(this.correctAnswer);
  this.answers = randomizeArray(allAnswers);

  this.isCorrect = false;
};

QuestionModel.prototype.bindEvents = function() {
  PubSub.subscribe('QuizView:submit-answers', (event) => {
    PubSub.publish(`QuestionModel:${this.questionNumber}:is-correct`, this.isCorrect);
  });

  PubSub.subscribe(`QuestionView:${this.questionNumber}:view-attached`, (event) => {
    PubSub.publish(`QuestionModel:${this.questionNumber}:question-data`, {
      question: this.question,
      answers: this.answers
    });
  });

  PubSub.subscribe(`QuestionView:${this.questionNumber}:answer-selected`, (event) => {
    const selectedAnswerIndex = event.detail;
    this.answerSelected(selectedAnswerIndex);
  });
};

QuestionModel.prototype.answerSelected = function (selectedAnswerIndex) {
  const selectedAnswer = this.answers[selectedAnswerIndex];
  this.isCorrect = this.correctAnswer === selectedAnswer;
};

function randomizeArray(array) {
  const result = [];
  while (array.length > 0) {
    const next = Math.floor(Math.random() * array.length);
    result.push(array[next]);

    // Remove the one we just added to the result list
    array.splice(next, 1);
  }

  return result;
}

module.exports = QuestionModel;
