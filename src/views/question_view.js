const PubSub = require('../helpers/pub_sub.js');

const QuestionView = function(element, questionNumber) {
  this.element = element;
  this.questionNumber = questionNumber;
  this.isCorrectElement = document.createElement('div');
};

QuestionView.prototype.bindEvents = function () {
  PubSub.subscribe(`QuestionModel:${this.questionNumber}:question-data`, (event) => {
    const questionData = event.detail;
    this.render(questionData);
  });

  PubSub.subscribe(`QuestionModel:${this.questionNumber}:is-correct`, (event => {
    const isCorrect = event.detail;
    let text = 'YOU GOT IT!';
    if (!isCorrect) {
      text = 'NOOO!';
    }
    this.isCorrectElement.innerText = text;
  }))

  PubSub.publish(`QuestionView:${this.questionNumber}:view-attached`);
};

QuestionView.prototype.render = function (questionData) {
  this.element.innerHTML = '';

  const question = document.createElement('div');
  question.innerHTML = questionData.question;
  this.element.appendChild(question);

  const answers = document.createElement('ul');
  questionData.answers.forEach((answer, index) => {
    const item = document.createElement('li');
    const radio = document.createElement('input');
    radio.id = `question-${this.questionNumber}-answer-${index}`
    radio.type = 'radio';
    radio.name = `question-${this.questionNumber}-answer`;
    radio.value = index;

    const label = document.createElement('label');
    label.htmlFor = radio.id;
    label.innerHTML = answer;

    radio.addEventListener('change', (event) => {
      PubSub.publish(`QuestionView:${this.questionNumber}:answer-selected`, event.target.value);
    });

    item.appendChild(radio);
    item.appendChild(label);

    answers.appendChild(item);
  });

  this.element.appendChild(answers);
  this.element.appendChild(this.isCorrectElement);
};

module.exports = QuestionView;
