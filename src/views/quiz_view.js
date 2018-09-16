const QuestionView = require('./question_view.js');
const PubSub = require('../helpers/pub_sub.js');

const QuizView = function(element, form) {
  this.element = element;
  this.form = form;
};

QuizView.prototype.bindEvents = function () {
  PubSub.subscribe('QuizModel:quiz-loaded', (event) => {
    const numQuestions = event.detail;
    this.render(numQuestions);
  });

  this.form.addEventListener('submit', (event) => {
    event.preventDefault();
    PubSub.publish('QuizView:submit-answers');
  });
};

QuizView.prototype.render = function(numQuestions) {
  this.element.innerHTML = '';
  for (let index = 0; index < numQuestions; index++) {
    const container = document.createElement('div');
    this.element.appendChild(container);

    const questionView = new QuestionView(container, index);
    questionView.bindEvents();
  }
};

module.exports = QuizView;
