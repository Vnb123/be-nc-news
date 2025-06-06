const {
  selectTopics,
  selectArticles,
  selectUsers,
  selectArticleById,
} = require("../models/news.models");

const getTopics = (request, response) => {
  selectTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};

const getArticles = (request, response, next) => {
  const { article_id } = request.query;
  selectArticles(article_id)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (request, response) => {
  selectUsers().then((users) => {
    response.status(200).send({ users });
  });
};

module.exports = { getTopics, getArticles, getUsers };
