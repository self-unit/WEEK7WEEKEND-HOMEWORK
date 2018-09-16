const SelectView = require('./views/select_view.js');
const QuizModel = require('./models/quiz_model.js');
const QuizView = require('./views/quiz_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const select = document.querySelector('#quiz-difficulty');
  const selectView = new SelectView(select);
  selectView.bindEvents();

  const quizModel = new QuizModel();
  quizModel.bindEvents();

  const container = document.querySelector('#quiz-details');
  const form = document.querySelector('form');
  const quizView = new QuizView(container, form);
  quizView.bindEvents();
});
