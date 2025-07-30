const {
  selectTopics,
  selectArticles,
  selectUsers,
  selectComments,
  insertComments,
  updateArticles,
  removeComments,
  updateComments,
} = require("../models/news.model");
const {
  fetchArticles,
  fetchUsernames,
  fetchComments,
} = require("../models/validation.model");
const { isValidCommentData } = require("../app-utils/correctData.js");

const getTopics = (request, response) => {
  selectTopics().then((topics) => {
    response.status(200).send({ topics });
  });
};

const getArticles = (request, response, next) => {
  const { article_id } = request.params;
  selectArticles(article_id)
    .then((articles) => {
      if (article_id) {
        const article = articles[0];
        response.status(200).send({ article });
      } else {
        response.status(200).send({ articles });
      }
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

const postComments = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body } = request.body;

  if (isValidCommentData(username, body)) {
    return response.status(400).send({ msg: "bad request" });
  }

  fetchUsernames(username)
    .then(() => {
      return insertComments(article_id, username, body);
    })
    .then((comment) => {
      response.status(201).send({ comments: [comment] });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticles = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  if (inc_votes === undefined) {
    return fetchArticles(article_id)
      .then((article) => {
        response.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  }
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

const deleteComments = (request, response, next) => {
  const { comment_id } = request.params;
  fetchComments(comment_id)
    .then(() => {
      return removeComments(comment_id);
    })
    .then((comment) => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

const patchComments = (request, response, next) => {
  const { comment_id } = request.params;
  const { inc_votes } = request.body;
  if (inc_votes === undefined) {
    return fetchComments(comment_id)
      .then((comments) => {
        response.status(200).send({ comment: comments[0] });
      })
      .catch((err) => {
        next(err);
      });
  }
  if (typeof inc_votes !== "number") {
    return response.status(400).send({ msg: "bad request" });
  }
  return fetchComments(comment_id)
    .then(() => {
      return updateComments(comment_id, inc_votes);
    })
    .then((updatedComment) => {
      response.status(200).send({ comment: updatedComment });
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
  postComments,
  patchArticles,
  deleteComments,
  patchComments,
};
