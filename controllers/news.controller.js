const {
  selectTopics,
  selectArticles,
  selectUsers,
  selectComments,
  insertComment,
  updateArticles,
} = require("../models/news.model");
const { fetchArticles, fetchUsername } = require("../models/validation.model");
const { isCommentDataIncorrect } = require("../app-utils/correctData.js");

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

const postComment = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (isCommentDataIncorrect(username, body)) {
    return response.status(400).send({ msg: "bad request" });
  }

  fetchUsername(username)
    .then(() => {
      return insertComment(article_id, username, body);
    })
    .then((comment) => {
      response
        .status(201)
        .send({ username: comment.author, body: comment.body });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticles = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  if (typeof inc_votes !== "number") {
    return response.status(400).send({ msg: "bad request" });
  }
  fetchArticles(article_id)
    .then(() => {
      return updateArticles(article_id, inc_votes);
    })
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getTopics,
  getArticles,
  getUsers,
  getComments,
  postComment,
  patchArticles,
};
