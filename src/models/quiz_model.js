const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const QuestionModel = require('./question_model.js');

const baseUrl = 'https://opentdb.com/api.php?amount=10&category=9';

const QuizModel = function() {
};

QuizModel.prototype.bindEvents = function() {
  PubSub.subscribe('SelectView:difficulty-selected', (event) => {
    const selectedDifficulty =  event.detail;
    let quizUrl = baseUrl;
    if (selectedDifficulty) {
      quizUrl = `${quizUrl}&difficulty=${selectedDifficulty}`;
    }

    const questions = [];
    RequestHelper.get(quizUrl)
      .then((data) => {
        data.results.forEach((quizQuestion, index) => {
          const question = new QuestionModel(index, quizQuestion);
          question.bindEvents();
          questions.push(question);
        });

        PubSub.publish('QuizModel:quiz-loaded', questions.length);
      });
  });
};

module.exports = QuizModel;
