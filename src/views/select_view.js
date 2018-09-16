const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  this.element.addEventListener('change', (event) => {
    const selectedDifficulty =  event.target.value;
    PubSub.publish('SelectView:difficulty-selected', selectedDifficulty);
  });
};

module.exports = SelectView;
