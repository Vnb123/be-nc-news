const {
  selectTopics,
  selectArticles,
  selectUsers,
  selectComments,
} = require("../models/news.model");
const { fetchArticles } = require("../models/articles.model");

const getTopics = (request, response) => {
  selectTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};

const getArticles = (request, response, next) => {
  const { article_id } = request.params;
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

const getComments = (request, response, next) => {
  const { article_id } = request.params;
  const promises = [selectComments(article_id)];
  if (article_id) {
    promises.push(fetchArticles(article_id));
  }
  Promise.all(promises)
    .then((resolvedPromises) => {
      const comments = resolvedPromises[0];
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics, getArticles, getUsers, getComments };
