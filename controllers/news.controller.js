const { selectTopics, selectArticles } = require("../models/news.models");

const getTopics = (request, response) => {
  selectTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};

const getArticles = (request, response) => {
  selectArticles().then((articles) => {
    response.status(200).send({ articles });
  });
};

module.exports = { getTopics, getArticles };
