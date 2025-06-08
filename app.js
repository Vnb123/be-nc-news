const express = require("express");
const app = express();
const {
  getTopics,
  getArticles,
  getUsers,
  getComments,
} = require("./controllers/news.controller");
const { getApi } = require("./controllers/api.controller");

const {
  handlePostgressErrors,
  handleServerErrors,
  handleCustomErrors,
} = require("./errors.js");

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.use(handlePostgressErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
