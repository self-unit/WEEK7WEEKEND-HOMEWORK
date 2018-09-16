const RequestHelper = {
  get: function(url) {
    return fetch(url)
      .then(response => response.json());
  },
};

module.exports = RequestHelper;
